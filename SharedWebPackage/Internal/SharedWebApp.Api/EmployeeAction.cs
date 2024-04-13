using XTI_App.Api;

namespace SharedWebApp.Api;

public sealed class EmployeeAction : AppAction<int, Employee>
{
    public Task<Employee> Execute(int id, CancellationToken ct)
    {
        return Task.FromResult(new Employee { ID = id, Name = "Someone", BirthDate = DateTime.Today });
    }
}