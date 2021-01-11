using Microsoft.AspNetCore.Mvc;
using SharedWebApp.Api;
using XTI_App.Api;

namespace SharedWebApp.Controllers
{
    public class EmployeeController : Controller
    {
        public IActionResult Index() => View();
        public IActionResult AddEmployeeForm() => PartialView();

        public IActionResult AddEmployee([FromBody] AddEmployeeForm model)
        {
            return Json(new ResultContainer<int>(1));
        }
    }
}
