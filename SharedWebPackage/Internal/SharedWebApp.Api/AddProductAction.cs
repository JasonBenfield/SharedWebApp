using XTI_App.Api;

namespace SharedWebApp.Api;

public sealed class AddProductAction : AppAction<AddProductModel, int>
{
    public Task<int> Execute(AddProductModel model, CancellationToken ct)
    {
        return Task.FromResult(1);
    }
}