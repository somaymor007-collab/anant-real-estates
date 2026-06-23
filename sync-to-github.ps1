# =============================================
# Anant Real Estates - GitHub Live Sync Script
# =============================================

param(
    [string]$Token = $env:GITHUB_TOKEN,
    [int]$Debounce = 5
)

$repoPath = "C:\Users\sande\OneDrive\Desktop\Learning\Anant"
$username = "somaymor007-collab"
$repoName = "anant-real-estates"

if (-not $Token) {
    Write-Host "[ERROR] Set GITHUB_TOKEN env var first." -ForegroundColor Red
    exit 1
}

$remoteUrl = "https://${username}:${Token}@github.com/${username}/${repoName}.git"
Set-Location $repoPath
git remote set-url origin $remoteUrl 2>$null

Write-Host "[SYNC] Anant Real Estates - Live GitHub Sync STARTED" -ForegroundColor Cyan
Write-Host "[SYNC] Watching: $repoPath" -ForegroundColor Yellow
Write-Host "[SYNC] Repo:     https://github.com/$username/$repoName" -ForegroundColor Yellow
Write-Host "[SYNC] Press Ctrl+C to stop." -ForegroundColor Gray

# File watcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $repoPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [IO.NotifyFilters]::LastWrite -bor [IO.NotifyFilters]::FileName -bor [IO.NotifyFilters]::DirectoryName

$global:changed = $false
$global:changedAt = [DateTime]::MinValue

$action = {
    param($s, $e)
    $p = $e.FullPath
    if ($p -match '\\(node_modules|\.next|\.git)\\') { return }
    $global:changed = $true
    $global:changedAt = [DateTime]::Now
}

Register-ObjectEvent $watcher Changed -Action $action | Out-Null
Register-ObjectEvent $watcher Created -Action $action | Out-Null
Register-ObjectEvent $watcher Deleted -Action $action | Out-Null
Register-ObjectEvent $watcher Renamed -Action $action | Out-Null

while ($true) {
    if ($global:changed) {
        $secs = ([DateTime]::Now - $global:changedAt).TotalSeconds
        if ($secs -ge $Debounce) {
            $global:changed = $false
            $ts = Get-Date -Format "HH:mm:ss"
            Set-Location $repoPath
            $st = git status --short 2>&1
            if ($st) {
                Write-Host "[$ts] Changes found - committing..." -ForegroundColor Green
                git add . 2>&1 | Out-Null
                $msg = "auto-sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
                git commit -m $msg 2>&1 | Out-Null
                git remote set-url origin $remoteUrl 2>&1 | Out-Null
                git push origin main 2>&1 | Out-Null
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[$ts] Pushed to GitHub OK!" -ForegroundColor Cyan
                } else {
                    Write-Host "[$ts] Push failed. Check token." -ForegroundColor Red
                }
            }
        }
    }
    Start-Sleep -Milliseconds 500
}
