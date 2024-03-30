using Microsoft.AspNetCore.OData.Query;
using XTI_App.Api;
using XTI_ODataQuery.Api;

namespace SharedWebApp.Api;

internal sealed class EmployeeQueryAction : QueryAction<EmptyRequest, EmployeeEntity>
{
    public Task<IQueryable<EmployeeEntity>> Execute(ODataQueryOptions<EmployeeEntity> options, EmptyRequest model) =>
        Task.FromResult
        (
            Enumerable.Range(1, 40)
                .Select
                (
                    i => new EmployeeEntity
                    {
                        ID = i,
                        EmployeeName = $"Employee {i}",
                        Salary = i * 2.1M,
                        DateHired = DateTime.Today.AddDays(-i),
                        Department = i % 2 == 0 ? "IT" : "Finance"
                    }
                )
                .AsQueryable()
        );
}
