using Microsoft.AspNetCore.Mvc;
using XTI_Core;

namespace SharedWebApp.Controllers;

public sealed class FormGroupDemoController : Controller
{
    private readonly IHostEnvironment hostEnv;
    private readonly XtiEnvironment xtiEnv;

    public FormGroupDemoController(IHostEnvironment hostEnv, XtiEnvironment xtiEnv)
    {
        this.hostEnv = hostEnv;
        this.xtiEnv = xtiEnv;
    }

    public IActionResult Index()
    {
        return View();
    }

}