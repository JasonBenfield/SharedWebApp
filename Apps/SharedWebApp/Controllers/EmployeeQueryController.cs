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
    public Task<IQueryable<EmployeeEntity>> Get(ODataQueryOptions<EmployeeEntity> odataQuery, ODataDemoArgs model, CancellationToken ct)
    {
        return groupApi.Query<EmployeeEntity>(nameof(Get)).Execute(odataQuery, ct);
    }

    [Route("ToExcel")]
    public async Task<IActionResult> ToExcel(ODataQueryOptions<EmployeeEntity> model, CancellationToken ct)
    {
        var result = await groupApi.QueryToExcel<EmployeeEntity>(nameof(ToExcel)).Execute(model, ct);
        return File(result.FileStream, result.ContentType, result.DownloadName);
    }
}
