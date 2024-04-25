using Microsoft.AspNetCore.Mvc;
using SharedWebApp.Api;

namespace SharedWebApp.Controllers;

public sealed class EmployeeController : Controller
{
    public IActionResult Index(EmployeeIndexRequest request)
    {
        return View();
    }

    public IActionResult FileUploadDemo() => View("FileUploadDemo");


    [ResponseCache(CacheProfileName = "Default")]
    public IActionResult AddEmployeeForm() => PartialView();

    public IActionResult AddEmployee([FromBody] AddEmployeeForm model)
    {
        return Json(new ResultContainer<int>(1));
    }

    public Task<ResultContainer<int>> AddProduct(AddProductModel model, CancellationToken ct)
    {
        return Task.FromResult(new ResultContainer<int>(1));
    }

    public IActionResult Test([FromBody] int model)
    {
        return Json(new ResultContainer<int>(model));
    }
}