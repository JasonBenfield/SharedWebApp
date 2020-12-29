using System.Threading.Tasks;
using XTI_App.Api;

namespace SharedWebApp.Api
{
    public sealed class AddEmployeeValidation : AppActionValidation<AddEmployeeForm>
    {
        public Task Validate(ErrorList errors, AddEmployeeForm model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                errors.Add("Name is required");
            }
            return Task.CompletedTask;
        }
    }

}
