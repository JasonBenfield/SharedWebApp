using Microsoft.Extensions.DependencyInjection;
using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api;

public sealed class HomeGroup : AppApiGroupWrapper
{
    public HomeGroup(AppApiGroup source, IServiceProvider sp)
        : base(source)
    {
        Index = source.AddAction(nameof(Index), () => new HomeIndexAction(sp.GetRequiredService<WebViewResultFactory>()));
    }
    public AppApiAction<EmptyRequest, WebViewResult> Index { get; }
}