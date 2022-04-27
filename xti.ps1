Import-Module PowershellForXti -Force

if(Test-Path ".\xti.private.ps1"){
. .\xti.Private.ps1
}

function Xti-NewVersion {
    param(
        [Parameter(Position=0)]
        [ValidateSet("major", "minor", "patch")]
        $VersionType = "minor",
        [ValidateSet("Default", "DB")]
        $HubAdministrationType = "Default"
    )
    New-BaseXtiVersion @PsBoundParameters
}

function Xti-NewIssue {
    param(
        [Parameter(Mandatory, Position=0)]
        [string] $IssueTitle,
        [switch] $Start
    )
    New-BaseXtiIssue @PsBoundParameters
}

function Xti-StartIssue {
    param(
        [Parameter(Position=0)]
        [long]$IssueNumber = 0
    )
    BaseXti-StartIssue @PsBoundParameters
}

function Xti-CompleteIssue {
    param(
    )
    BaseXti-CompleteIssue @PsBoundParameters
}

function Xti-Build {
    param(
        [ValidateSet("Development", "Production", "Staging", "Test")]
        $EnvName = "Development"
    )
    BaseXti-BuildWebApp @PsBoundParameters
}

function Xti-Publish {
    param(
        [ValidateSet("Development", "Production")]
        $EnvName = "Development",
        [ValidateSet("Default", "DB")]
        $HubAdministrationType = "Default"
    )
    $DestinationMachine = Get-DestinationMachine --EnvName $EnvName
    $PsBoundParameters.Add("DestinationMachine", $DestinationMachine)
    $Domain = Get-Domain -EnvName $EnvName
    $PsBoundParameters.Add("Domain", $Domain)
    $SiteName = Get-SiteName -EnvName $EnvName
    $PsBoundParameters.Add("SiteName", $SiteName)
    BaseXti-Publish @PsBoundParameters
}

function Xti-Install {
    param(
        [ValidateSet("Development", "Production", "Staging", "Test")]
        $EnvName = "Development"
    )
    $DestinationMachine = Get-DestinationMachine --EnvName $EnvName
    $PsBoundParameters.Add("DestinationMachine", $DestinationMachine)
    $Domain = Get-Domain -EnvName $EnvName
    $PsBoundParameters.Add("Domain", $Domain)
    $SiteName = Get-SiteName -EnvName $EnvName
    $PsBoundParameters.Add("SiteName", $SiteName)
    BaseXti-Install @PsBoundParameters
}
