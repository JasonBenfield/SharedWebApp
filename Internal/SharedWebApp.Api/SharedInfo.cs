using XTI_App.Abstractions;

namespace SharedWebApp.Api;

public static class SharedInfo
{
    public static readonly AppKey AppKey = new AppKey("Shared", AppType.Values.WebApp);
}