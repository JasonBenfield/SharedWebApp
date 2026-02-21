using Microsoft.AspNetCore.Mvc;

namespace XtiCoreWebPackage.Controllers;

public sealed class MVVMController : Controller
{
    public IActionResult Index() => View();

}