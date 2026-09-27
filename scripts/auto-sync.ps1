param(
    [string]$RepoPath = ".",
    [int]$IntervalSeconds = 60
)

while ($true) {
    git -C $RepoPath pull --ff-only
    Start-Sleep -Seconds $IntervalSeconds
}
