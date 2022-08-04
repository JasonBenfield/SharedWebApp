using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api;

public sealed class EmployeeGroup : AppApiGroupWrapper
{
    public EmployeeGroup(AppApiGroup source)
        : base(source)
    {
        Index = source.AddAction(nameof(Index), () => ViewAppAction<EmptyRequest>.Index());
        AddEmployee = source.AddAction
        (
            nameof(AddEmployee),
            () => new AddEmployeeAction(),
            () => new AddEmployeeValidation()
        );
        Employee = source.AddAction
        (
            nameof(Employee),
            () => new EmployeeAction(),
            friendlyName: "Get Employee Information"
        );
    }
    public AppApiAction<EmptyRequest, WebViewResult> Index { get; }
    public AppApiAction<AddEmployeeForm, int> AddEmployee { get; }
    public AppApiAction<int, Employee> Employee { get; }
}