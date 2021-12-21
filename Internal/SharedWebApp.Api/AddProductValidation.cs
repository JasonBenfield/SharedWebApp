using XTI_App.Api;
using XTI_Core;

namespace SharedWebApp.Api;

public sealed class AddProductValidation : AppActionValidation<AddProductModel>
{
    public Task Validate(ErrorList errors, AddProductModel model)
    {
        if (string.IsNullOrWhiteSpace(model.Name))
        {
            errors.Add("Name is required");
        }
        return Task.CompletedTask;
    }
}