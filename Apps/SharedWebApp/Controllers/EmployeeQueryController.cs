using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using SharedWebApp.Api;
using XTI_App.Api;
using XTI_ODataQuery.Api;

namespace SharedWebApp.Controllers;

[Route("odata/EmployeeQuery")]
public sealed class EmployeeQueryController : XtiODataController<EmployeeEntity>
{
    private readonly IAppApiGroup groupApi;

    public EmployeeQueryController(IAppApi api) : base(api.Group("EmployeeQuery"))
    {
        groupApi = api.Group("EmployeeQuery");
    }

    [HttpGet]
    [Route("ToExcel")]
    public new async Task<IActionResult> ToExcel(ODataQueryOptions<EmployeeEntity> model, CancellationToken ct)
    {
        var result = await groupApi.QueryToExcel<EmployeeEntity>(nameof(ToExcel)).Execute(model, ct);
        return File(result.FileStream, result.ContentType, result.DownloadName);
    }
}
