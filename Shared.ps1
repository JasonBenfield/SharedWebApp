Import-Module PowershellForXti -Force

$script:sharedConfig = [PSCustomObject]@{
    RepoOwner = "JasonBenfield"
    RepoName = "SharedWebApp"
    AppName = "Shared"
    AppType = "WebApp"
    AppsToImport = ""
}

function Shared-NewVersion {
    param(
        [Parameter(Position=0)]
        [ValidateSet("major", "minor", "patch")]
        $VersionType = "minor",
        [ValidateSet("Development", "Production", "Staging", "Test")]
        $EnvName = "Production"
    )
    $script:sharedConfig | New-XtiVersion @PsBoundParameters
}

function Shared-NewIssue {
    param(
        [Parameter(Mandatory, Position=0)]
        [string] $IssueTitle,
        [switch] $Start
    )
    $script:sharedConfig | New-XtiIssue @PsBoundParameters
}

function Shared-StartIssue {
    param(
        [Parameter(Position=0)]
        [long]$IssueNumber = 0
    )
    $script:sharedConfig | Xti-StartIssue @PsBoundParameters
}

function Shared-CompleteIssue {
    param(
        [ValidateSet("Development", "Production", "Staging", "Test")]
        $EnvName = "Production"
    )
    $script:sharedConfig | Xti-CompleteIssue @PsBoundParameters
}

function Shared-Build {
    param(
        [ValidateSet("Development", "Production", "Staging", "Test")]
        $EnvName = "Development"
    )
    $script:sharedConfig | Xti-BuildWebApp @PsBoundParameters
}

function Shared-Publish {
    param(
        [ValidateSet("Development", "Production")]
        $EnvName = "Development",
        [switch] $NoInstall
    )
    $DestinationMachine = Get-DestinationMachine --EnvName $EnvName
    $PsBoundParameters.Add("DestinationMachine", $DestinationMachine)
    $script:sharedConfig | Xti-Publish @PsBoundParameters
}

function Shared-Install {
    param(
        [ValidateSet("Development", "Production", "Staging", "Test")]
        $EnvName = "Development"
    )
    $DestinationMachine = Get-DestinationMachine --EnvName $EnvName
    $PsBoundParameters.Add("DestinationMachine", $DestinationMachine)
    $script:sharedConfig | Xti-Install @PsBoundParameters
}

function Get-DestinationMachine {
    param(
        $EnvName
    )
    if($EnvName -eq "Development")
    {
        $DestinationMachine = ""
    }
    else
    {
        $DestinationMachine = "finduilas.xartogg.com"
    }
    return $DestinationMachine
}
