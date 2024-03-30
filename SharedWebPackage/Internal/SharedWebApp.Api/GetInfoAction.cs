using XTI_App.Api;

namespace SharedWebApp.Api;

public sealed class GetInfoAction : AppAction<EmptyRequest, string>
{
    public Task<string> Execute(EmptyRequest model, CancellationToken ct)
    {
        return Task.FromResult("");
    }
}