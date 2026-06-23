# =============================================
# Anant Real Estates - GitHub Auto-Sync Script
# Run this in a SEPARATE terminal window.
# It watches for file changes and auto-pushes
# to GitHub every time you save a file.
#
# SETUP (run once before starting this script):
#   $env:GITHUB_TOKEN = "your_github_token_here"
#
# Then run:
#   .\sync-to-github.ps1
# =============================================

$repoPath = "C:\Users\sande\OneDrive\Desktop\Learning\Anant"
$username = "somaymor007-collab"
$repoName = "anant-real-estates"
$debounce = 5   # seconds to wait after last change before committing

# Read token from environment variable (never hardcode tokens in files)
$token = $env:GITHUB_TOKEN
if (-not $token) {
    Write-Host "  ❌ ERROR: GITHUB_TOKEN environment variable not set." -ForegroundColor Red
    Write-Host "  Run this first:" -ForegroundColor Yellow
    Write-Host "    `$env:GITHUB_TOKEN = 'your_token_here'" -ForegroundColor Cyan
    exit 1
}

$remoteUrl = "https://${username}:${token}@github.com/${username}/${repoName}.git"

# Ensure remote is set correctly (with token in URL for auth)
Set-Location $repoPath
git remote set-url origin $remoteUrl 2>$null

Write-Host ""
Write-Host "  ╔═══════════════════════════════════════════╗" -ForegroundColor DarkYellow
Write-Host "  ║  🏡 Anant Real Estates — GitHub Live Sync  ║" -ForegroundColor Yellow
Write-Host "  ╚═══════════════════════════════════════════╝" -ForegroundColor DarkYellow
Write-Host ""
Write-Host "  📁 Watching : $repoPath" -ForegroundColor Cyan
Write-Host "  🔗 Repo     : https://github.com/$username/$repoName" -ForegroundColor Cyan
Write-Host "  ⏱  Debounce : ${debounce}s after last file change" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Press Ctrl+C to stop." -ForegroundColor Gray
Write-Host ""

# Set up file watcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $repoPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [IO.NotifyFilters]::LastWrite -bor [IO.NotifyFilters]::FileName -bor [IO.NotifyFilters]::DirectoryName

$global:changeDetected = $false
$global:changeTime     = [DateTime]::MinValue

$onChange = {
    param($source, $e)
    $path = $e.FullPath
    # Ignore build artifacts and git internals
    if ($path -match '\\(node_modules|\.next|\.git)\\') { return }
    $global:changeDetected = $true
    $global:changeTime     = [DateTime]::Now
}

Register-ObjectEvent $watcher "Changed" -Action $onChange | Out-Null
Register-ObjectEvent $watcher "Created" -Action $onChange | Out-Null
Register-ObjectEvent $watcher "Deleted" -Action $onChange | Out-Null
Register-ObjectEvent $watcher "Renamed" -Action $onChange | Out-Null

# Main polling loop
while ($true) {
    if ($global:changeDetected) {
        $elapsed = ([DateTime]::Now - $global:changeTime).TotalSeconds
        if ($elapsed -ge $debounce) {
            $global:changeDetected = $false
            $ts = Get-Date -Format "HH:mm:ss"

            Set-Location $repoPath
            $status = git status --short 2>&1
            if ($status) {
                Write-Host "  [$ts] 📝 Changes detected — committing and pushing..." -ForegroundColor Green
                git add . 2>&1 | Out-Null
                $msg = "Auto-sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
                git commit -m $msg 2>&1 | Out-Null
                git remote set-url origin $remoteUrl 2>&1 | Out-Null
                $push = git push origin main 2>&1
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "  [$ts] ✅ Pushed successfully to GitHub!" -ForegroundColor Cyan
                } else {
                    Write-Host "  [$ts] ❌ Push failed: $push" -ForegroundColor Red
                }
            }
        }
    }
    Start-Sleep -Milliseconds 500
}
