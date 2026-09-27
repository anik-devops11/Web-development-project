# Web-development-project

## Automatically sync updates to your PC

If you want changes from GitHub to show up on your PC automatically, run this script from your local clone:

```powershell
pwsh ./scripts/auto-sync.ps1 -RepoPath . -IntervalSeconds 60
```

This keeps pulling the latest changes every 60 seconds.

### Optional: run at startup on Windows

Create a Scheduled Task that runs:

```powershell
pwsh -File C:\path\to\Web-development-project\scripts\auto-sync.ps1 -RepoPath C:\path\to\Web-development-project -IntervalSeconds 60
```
