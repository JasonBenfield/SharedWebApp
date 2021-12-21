using Microsoft.AspNetCore.Mvc;

namespace SharedWebApp.Controllers;

public sealed class CardDemoController : Controller
{
    public IActionResult Index() => View();

}