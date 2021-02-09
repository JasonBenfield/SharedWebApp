Import-Module PowershellForXti -Force

$script:sharedConfig = [PSCustomObject]@{
    RepoOwner = "JasonBenfield"
    RepoName = "SharedWebApp"
    AppName = "Shared"
    AppType = "WebApp"
    ProjectDir = "Apps\SharedWebApp"
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
    $script:sharedConfig | Xti-Merge @PsBoundParameters
}

function Shared-New-XtiPullRequest {
    param(
        [Parameter(Position=0)]
        [string] $CommitMessage
    )
    $script:sharedConfig | New-XtiPullRequest @PsBoundParameters
}

function Shared-Xti-PostMerge {
    $script:sharedConfig | Xti-PostMerge
}

function Shared-ExportWeb {
    param(
        [switch] $Prod
    )
    tsc -p "$($script:sharedConfig.ProjectDir)\Scripts\$($script:sharedConfig.AppName)\tsconfig.json"
    
    $script:sharedConfig | Xti-ExportWeb @PsBoundParameters
}

function Shared-Publish {
    param(
        [switch] $Prod
    )
    Shared-Webpack
    dotnet build 
    if($Prod) {
        $branch = Get-CurrentBranchname
        Xti-BeginPublish -BranchName $branch
        $script:sharedConfig | Xti-PublishPackage -DisableUpdateVersion -Prod
        Shared-ExportWeb -Prod
        Xti-EndPublish -BranchName $branch
        $script:sharedConfig | Xti-Merge
    }
    else{
        $script:sharedConfig | Xti-PublishPackage -DisableUpdateVersion
        Shared-ExportWeb
    }
}

function Shared-Webpack {
    param(
    )
    $ProjectDir = $script:sharedConfig.ProjectDir
    $currentDir = (Get-Item .).FullName
    Set-Location $ProjectDir
    webpack
    Set-Location $currentDir
}
