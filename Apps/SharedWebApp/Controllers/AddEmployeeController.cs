using Microsoft.AspNetCore.Mvc;
using SharedWebApp.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SharedWebApp.Controllers
{
    public class AddEmployeeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult AddEmployee([FromBody] AddEmployeeForm model)
        {
            return Json(1);
        }
    }
}
