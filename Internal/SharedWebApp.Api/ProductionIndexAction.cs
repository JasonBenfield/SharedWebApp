using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api;

internal sealed class ProductIndexAction : AppAction<EmptyRequest, WebViewResult>
{
    private readonly WebViewResultFactory viewFactory;

    public ProductIndexAction(WebViewResultFactory viewFactory)
    {
        this.viewFactory = viewFactory;
    }

    public Task<WebViewResult> Execute(EmptyRequest model, CancellationToken stoppingToken) =>
        Task.FromResult(viewFactory.Default("product", "Product"));
}
