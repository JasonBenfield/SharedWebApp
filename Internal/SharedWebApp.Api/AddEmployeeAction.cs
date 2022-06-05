using XTI_App.Api;

namespace SharedWebApp.Api;

public sealed class AddEmployeeAction : AppAction<AddEmployeeForm, int>
{
    public Task<int> Execute(AddEmployeeForm model, CancellationToken ct)
    {
        return Task.FromResult(1);
    }
}