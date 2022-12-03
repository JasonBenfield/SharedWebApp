using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api;

internal sealed class EmployeeIndexAction : AppAction<EmptyRequest, WebViewResult>
{
    private readonly WebViewResultFactory viewFactory;

    public EmployeeIndexAction(WebViewResultFactory viewFactory)
    {
        this.viewFactory = viewFactory;
    }

    public Task<WebViewResult> Execute(EmptyRequest model, CancellationToken stoppingToken) =>
        Task.FromResult(viewFactory.Default("employee", "Employee"));
}
