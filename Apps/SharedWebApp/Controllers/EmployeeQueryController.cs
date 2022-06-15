using Microsoft.AspNetCore.Mvc;
using SharedWebApp.Api;
using XTI_App.Api;
using XTI_ODataQuery.Api;

namespace SharedWebApp.Controllers;

[Route("odata/EmployeeQuery")]
public sealed class EmployeeQueryController : XtiODataController<EmployeeEntity>
{
    public EmployeeQueryController(IAppApi api) : base(api.Group("EmployeeQuery"))
    {
    }
}
