using System.Threading.Tasks;
using XTI_App.Api;

namespace SharedWebApp.Api
{
    public sealed class AddEmployeeAction : AppAction<AddEmployeeForm, int>
    {
        public Task<int> Execute(AddEmployeeForm model)
        {
            return Task.FromResult(1);
        }
    }

}
