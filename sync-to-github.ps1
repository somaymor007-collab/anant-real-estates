# =============================================
# Anant Real Estates - GitHub Auto-Sync Script
# Run this in a separate terminal to auto-push
# every time you save a file.
# Usage: .\sync-to-github.ps1
# =============================================

$repoPath = "C:\Users\sande\OneDrive\Desktop\Learning\Anant"
$debounceSeconds = 5
$lastPush = [DateTime]::MinValue

Write-Host "🔄 Anant Real Estates — GitHub Live Sync Started" -ForegroundColor Cyan
Write-Host "📁 Watching: $repoPath" -ForegroundColor Yellow
Write-Host "⏱️  Auto-pushing changes every $debounceSeconds seconds after file save" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop.`n" -ForegroundColor Gray

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $repoPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]::LastWrite -bor [System.IO.NotifyFilters]::FileName

# Ignore node_modules and .next
$filter = {
    param($source, $e)
    $path = $e.FullPath
    if ($path -like "*\node_modules\*" -or $path -like "*\.next\*" -or $path -like "*\.git\*") {
        return
    }
    $global:fileChanged = $true
    $global:lastChangedFile = $path
    $global:changeTime = [DateTime]::Now
}

Register-ObjectEvent $watcher "Changed" -Action $filter | Out-Null
Register-ObjectEvent $watcher "Created" -Action $filter | Out-Null
Register-ObjectEvent $watcher "Deleted" -Action $filter | Out-Null

$global:fileChanged = $false
$global:lastChangedFile = ""
$global:changeTime = [DateTime]::MinValue

while ($true) {
    if ($global:fileChanged) {
        $elapsed = ([DateTime]::Now - $global:changeTime).TotalSeconds
        if ($elapsed -ge $debounceSeconds) {
            $global:fileChanged = $false
            $timestamp = Get-Date -Format "HH:mm:ss"
            
            Write-Host "[$timestamp] 📝 Changes detected. Committing..." -ForegroundColor Green
            
            Set-Location $repoPath
            
            $status = git status --short
            if ($status) {
                git add . 2>&1 | Out-Null
                $commitMsg = "Auto-sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
                git commit -m $commitMsg 2>&1 | Out-Null
                $pushResult = git push origin main 2>&1
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[$timestamp] ✅ Pushed to GitHub successfully!" -ForegroundColor Cyan
                } else {
                    Write-Host "[$timestamp] ⚠️  Push failed: $pushResult" -ForegroundColor Red
                }
            } else {
                Write-Host "[$timestamp] ℹ️  No changes to commit." -ForegroundColor Gray
            }
        }
    }
    Start-Sleep -Milliseconds 500
}
