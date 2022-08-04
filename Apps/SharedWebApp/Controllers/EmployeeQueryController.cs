using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using SharedWebApp.Api;
using XTI_App.Api;
using XTI_ODataQuery.Api;

namespace SharedWebApp.Controllers;

[Route("odata/EmployeeQuery")]
public sealed class EmployeeQueryController : ODataController
{
    private readonly IAppApiGroup groupApi;

    public EmployeeQueryController(IAppApi api)
    {
        groupApi = api.Group("EmployeeQuery");
    }

    [HttpPost]
    [HttpGet]
    [EnableQuery]
    public Task<IQueryable<EmployeeEntity>> Get(ODataQueryOptions<EmployeeEntity> odataQuery, EmptyRequest model, CancellationToken ct)
    {
        return groupApi.Query<EmptyRequest, EmployeeEntity>(nameof(Get)).Execute(odataQuery, model, ct);
    }

    [Route("ToExcel")]
    public async Task<IActionResult> ToExcel(ODataQueryOptions<EmployeeEntity> odataQuery, EmptyRequest model, CancellationToken ct)
    {
        var result = await groupApi.QueryToExcel<EmptyRequest, EmployeeEntity>(nameof(ToExcel)).Execute(odataQuery, model, ct);
        return File(result.FileStream, result.ContentType, result.DownloadName);
    }
}
