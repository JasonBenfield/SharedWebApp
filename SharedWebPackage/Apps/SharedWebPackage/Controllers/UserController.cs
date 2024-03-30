using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SharedWebApp.Api;
using XTI_App.Api;
using XTI_WebApp.Abstractions;
using XTI_WebApp.Api;

namespace SharedWebApp.Controllers;

[AllowAnonymous]
public sealed class UserController : Controller
{
    private readonly SharedAppApi api;

    public UserController(SharedAppApi api)
    {
        this.api = api;
    }

    [HttpPost]
    public Task<ResultContainer<LinkModel[]>> GetMenuLinks([FromBody] string menuName, CancellationToken ct) =>
        api.User.GetMenuLinks.Execute(menuName, ct);

    [HttpPost]
    public Task<ResultContainer<WebRedirectResult>> UserProfile([FromBody] EmptyRequest model, CancellationToken ct) =>
        api.User.UserProfile.Execute(model, ct);
}