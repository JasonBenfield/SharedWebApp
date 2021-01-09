using System.Threading.Tasks;
using XTI_App.Api;
using XTI_Core;

namespace SharedWebApp.Api
{
    public sealed class AddEmployeeValidation : AppActionValidation<AddEmployeeForm>
    {
        public Task Validate(ErrorList errors, AddEmployeeForm model)
        {
            return Task.CompletedTask;
        }
    }

}
