using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api;

internal sealed class EmployeeIndexAction : AppAction<EmployeeIndexRequest, WebViewResult>
{
    private readonly WebViewResultFactory viewFactory;

    public EmployeeIndexAction(WebViewResultFactory viewFactory)
    {
        this.viewFactory = viewFactory;
    }

    public Task<WebViewResult> Execute(EmployeeIndexRequest model, CancellationToken stoppingToken) =>
        Task.FromResult(viewFactory.Default("employee", "Employee"));
}
