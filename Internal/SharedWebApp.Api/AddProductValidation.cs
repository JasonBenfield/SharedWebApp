using XTI_App.Api;
using XTI_Core;

namespace SharedWebApp.Api;

public sealed class AddProductValidation : AppActionValidation<AddProductModel>
{
    public Task Validate(ErrorList errors, AddProductModel model, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(model.Name))
        {
            errors.Add("Name is required");
        }
        return Task.CompletedTask;
    }
}