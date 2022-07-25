using Microsoft.AspNetCore.OData.Query;
using XTI_ODataQuery.Api;

namespace SharedWebApp.Api;

internal sealed class EmployeeQueryAction : QueryAction<EmployeeEntity>
{
    public IQueryable<EmployeeEntity> Execute(ODataQueryOptions<EmployeeEntity> options) =>
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
            .AsQueryable();
}
