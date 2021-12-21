using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api;

public sealed class EmployeeGroup : AppApiGroupWrapper
{
    public EmployeeGroup(AppApiGroup source)
        : base(source)
    {
        var actions = new WebAppApiActionFactory(source);
        Index = source.AddAction(actions.DefaultView());
        AddEmployee = source.AddAction
        (
            actions.Action
            (
                nameof(AddEmployee),
                () => new AddEmployeeValidation(),
                () => new AddEmployeeAction()
            )
        );
        Employee = source.AddAction
        (
            actions.Action
            (
                nameof(Employee),
                () => new EmployeeAction(),
                "Get Employee Information"
            )
        );
    }
    public AppApiAction<EmptyRequest, WebViewResult> Index { get; }
    public AppApiAction<AddEmployeeForm, int> AddEmployee { get; }
    public AppApiAction<int, Employee> Employee { get; }
}