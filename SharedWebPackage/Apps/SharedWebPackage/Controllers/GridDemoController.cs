using Microsoft.AspNetCore.Mvc;

namespace SharedWebApp.Controllers;

public sealed class GridDemoController : Controller
{
    public IActionResult Index() => View();
}
