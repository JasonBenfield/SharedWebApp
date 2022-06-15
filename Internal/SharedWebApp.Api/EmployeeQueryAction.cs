using Microsoft.AspNetCore.OData.Query;
using XTI_ODataQuery.Api;

namespace SharedWebApp.Api;

internal sealed class EmployeeQueryAction : QueryAction<EmployeeEntity>
{
    public IQueryable<EmployeeEntity> Execute(ODataQueryOptions<EmployeeEntity> options) =>
        Enumerable.Range(1, 20)
            .Select
            (
                i => new EmployeeEntity
                {
                    ID = i,
                    EmployeeName = $"Employee {i}",
                    Salary = i * 2.1M,
                    DateHired = DateTime.Today.AddDays(-i)
                }
            )
            .AsQueryable();
}
