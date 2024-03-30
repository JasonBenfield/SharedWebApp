using Microsoft.AspNetCore.OData;
using Microsoft.OData.ModelBuilder;
using SharedWebApp.Api;
using XTI_App.Abstractions;
using XTI_App.Api;
using XTI_App.Fakes;
using XTI_Core;
using XTI_Core.Extensions;
using XTI_WebApp.Abstractions;
using XTI_WebApp.Api;
using XTI_WebApp.Extensions;
using XTI_WebApp.Fakes;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.UseXtiConfiguration(builder.Environment, "", "", new string[0]);
builder.Services.AddSingleton(_ => XtiEnvironment.Parse(builder.Environment.EnvironmentName));
builder.Services.AddFakesForXtiWebApp();
builder.Services.AddScoped<ITransformedLinkFactory, DefaultTransformedLinkFactory>();
builder.Services.AddScoped<XtiAuthenticationOptions>();
builder.Services.AddScoped<AppClients>();
builder.Services.AddScoped<AppClientDomainSelector>();
builder.Services.AddScoped<IAppClientDomain, AppClientDomainSelector>();
builder.Services.AddSingleton(_ => SharedInfo.AppKey);
builder.Services.AddSingleton<InstallationIDAccessor, FakeInstallationIDAccessor>();
builder.Services.AddScoped<SharedAppApiFactory>();
builder.Services.AddScoped<AppApiFactory>(sp => sp.GetRequiredService<SharedAppApiFactory>());
builder.Services.AddScoped(sp => (SharedAppApi)sp.GetRequiredService<IAppApi>());
builder.Services.AddResponseCaching();
builder.Services.AddSingleton<AppPageModel>();
builder.Services
    .AddMvc()
    .AddOData(options =>
    {
        var odataBuilder = new ODataConventionModelBuilder();
        odataBuilder.EntitySet<EmployeeEntity>("EmployeeQuery");
        options.EnableQueryFeatures(10000)
            .AddRouteComponents("odata", odataBuilder.GetEdmModel());
    })
    .AddJsonOptions(options =>
    {
        options.SetDefaultJsonOptions();
    })
    .AddMvcOptions(options =>
    {
        options.SetDefaultMvcOptions();
    });

var app = builder.Build();
app.UseODataQueryRequest();
var sp = app.Services.CreateScope().ServiceProvider;
var appContext = sp.GetRequiredService<FakeAppContext>();
var apiFactory = sp.GetRequiredService<SharedAppApiFactory>();
var template = apiFactory.CreateTemplate().ToModel();
var fakeApp = appContext.AddApp(template);
appContext.SetCurrentApp(fakeApp);
var userContext = sp.GetRequiredService<FakeUserContext>();
var userContextModel = userContext.AddUser(new AppUserName("Jason.Benfield"));
userContext.SetCurrentUser(userContextModel.User.UserName);
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseResponseCaching();
app.UseRouting();
app.UseAuthorization();
app.MapControllerRoute
(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);
await app.RunAsync();