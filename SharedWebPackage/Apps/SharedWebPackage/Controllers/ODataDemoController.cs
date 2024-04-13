using Microsoft.AspNetCore.Mvc;

namespace SharedWebApp.Controllers;

public sealed class ODataDemoController : Controller
{
    public IActionResult Index() => View();

}