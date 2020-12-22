using Microsoft.AspNetCore.Mvc;

namespace SharedWebApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Account()
        {
            return PartialView();
        }
    }
}
