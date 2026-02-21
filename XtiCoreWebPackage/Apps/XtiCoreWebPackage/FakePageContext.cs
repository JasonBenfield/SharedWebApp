using XTI_Core;
using XTI_WebApp.Abstractions;

namespace XtiCoreWebPackage;

public sealed class FakePageContext : IPageContext
{
    public string CacheBust { get; set; } = "";

    public string EnvironmentName { get; set; } = "";

    public string AppTitle { get; set; } = "";

    public bool IsAuthenticated { get; set; } = false;

    public string RootUrl { get; set; } = "";

    public string UserName { get; set; } = "";

    public string PageTitle { get; set; } = "";
    public string PageName { get; set; } = "";

    public AppVersionDomain[] WebAppDomains { get; set; } = [];

    public Task<string> Serialize() =>
        Task.FromResult(XtiSerializer.Serialize(this));
}
