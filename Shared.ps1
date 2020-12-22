Import-Module PowershellForXti -Force

$script:sharedConfig = [PSCustomObject]@{
    RepoOwner = "JasonBenfield"
    RepoName = "SharedWebApp"
    AppName = "Shared"
    AppType = "WebApp"
    ProjectDir = "C:\XTI\src\SharedWebApp\Apps\SharedWebApp"
}

function Shared-New-XtiIssue {
    param(
        [Parameter(Mandatory, Position=0)]
        [string] $IssueTitle,
        $Labels = @(),
        [string] $Body = "",
        [switch] $Start
    )
    $script:sharedConfig | New-XtiIssue @PsBoundParameters
}

function Shared-Xti-StartIssue {
    param(
        [Parameter(Position=0)]
        [long]$IssueNumber = 0,
        $IssueBranchTitle = "",
        $AssignTo = ""
    )
    $script:sharedConfig | Xti-StartIssue @PsBoundParameters
}

function Shared-New-XtiVersion {
    param(
        [Parameter(Position=0)]
        [ValidateSet("major", "minor", "patch")]
        $VersionType = "minor",
        [ValidateSet("Development", "Production", "Staging", "Test")]
        $EnvName = "Production"
    )
    $script:sharedConfig | New-XtiVersion @PsBoundParameters
}

function Shared-Xti-Merge {
    param(
        [Parameter(Position=0)]
        [string] $CommitMessage
    )
    $branchName = Get-CurrentBranchname
    $releaseBranch = Parse-ReleaseBranch $branchName
    if($releaseBranch.IsValid) {
        Xti-BeginPublish -BranchName $branchName
        Xti-EndPublish -BranchName $branchName
    }
    $script:sharedConfig | Xti-Merge @PsBoundParameters
}

function Shared-Xti-Merge {
    $branchName = Get-CurrentBranchname
    $releaseBranch = Parse-ReleaseBranch $branchName
    if($releaseBranch.IsValid) {
        Xti-BeginPublish -BranchName $branch
        Xti-EndPublish -BranchName $branch
    }
    $script:sharedConfig | Xti-Merge
}

function Shared-New-XtiPullRequest {
    param(
        [Parameter(Position=0)]
        [string] $CommitMessage
    )
    $script:sharedConfig | New-XtiPullRequest @PsBoundParameters
}

function Shared-Xti-PostMerge {
    $branchName = Get-CurrentBranchname
    $releaseBranch = Parse-ReleaseBranch $branchName
    if($releaseBranch.IsValid) {
        Xti-BeginPublish -BranchName $branchName
        Xti-EndPublish -BranchName $branchName
    }
    $script:sharedConfig | Xti-PostMerge
}
