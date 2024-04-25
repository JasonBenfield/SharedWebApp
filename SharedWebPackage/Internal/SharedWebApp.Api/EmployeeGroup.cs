using Microsoft.Extensions.DependencyInjection;
using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api;

public sealed class EmployeeGroup : AppApiGroupWrapper
{
    public EmployeeGroup(AppApiGroup source, IServiceProvider sp)
        : base(source)
    {
        Index = source.AddAction(nameof(Index), () => new EmployeeIndexAction(sp.GetRequiredService<WebViewResultFactory>()));
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
    public AppApiAction<EmployeeIndexRequest, WebViewResult> Index { get; }
    public AppApiAction<AddEmployeeForm, int> AddEmployee { get; }
    public AppApiAction<int, Employee> Employee { get; }
}