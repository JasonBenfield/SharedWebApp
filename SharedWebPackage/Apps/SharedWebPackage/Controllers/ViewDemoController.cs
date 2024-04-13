using Microsoft.AspNetCore.Mvc;

namespace SharedWebApp.Controllers;

public sealed class ViewDemoController : Controller
{
    public IActionResult Index() => View();

}