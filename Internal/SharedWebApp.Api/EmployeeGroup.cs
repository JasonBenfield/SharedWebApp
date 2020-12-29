using XTI_App;
using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api
{
    public sealed class EmployeeGroup : AppApiGroup
    {
        public EmployeeGroup(AppApi api, IAppApiUser user)
            : base
            (
                  api,
                  new NameFromGroupClassName(nameof(EmployeeGroup)).Value,
                  ModifierCategoryName.Default,
                  api.Access,
                  user,
                  (n, a, u) => new WebAppApiActionCollection(n, a, u)
            )
        {
            var actions = Actions<WebAppApiActionCollection>();
            Index = actions.AddDefaultView();
            AddEmployee = actions.AddAction
            (
                "AddEmployee",
                () => new AddEmployeeValidation(),
                () => new AddEmployeeAction()
            );
            Employee = actions.AddAction
            (
                "Employee",
                () => new EmployeeAction(),
                "Get Employee Information"
            );
        }
        public AppApiAction<EmptyRequest, AppActionViewResult> Index { get; }
        public AppApiAction<AddEmployeeForm, int> AddEmployee { get; }
        public AppApiAction<int, Employee> Employee { get; }
    }

}
