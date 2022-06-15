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
builder.Services.AddScoped<XtiAuthenticationOptions>();
builder.Services.AddScoped<AppClients>();
builder.Services.AddScoped<AppClientDomainSelector>();
builder.Services.AddScoped<IAppClientDomain, AppClientDomainSelector>();
builder.Services.AddSingleton(_ => SharedInfo.AppKey);
builder.Services.AddSingleton<InstallationIDAccessor, FakeInstallationIDAccessor>();
builder.Services.AddSingleton<SharedAppApiFactory>();
builder.Services.AddSingleton<AppApiFactory>(sp => sp.GetRequiredService<SharedAppApiFactory>());
builder.Services.AddSingleton(sp => (SharedAppApi)sp.GetRequiredService<IAppApi>());
builder.Services.AddResponseCaching();
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
var appContext = app.Services.GetRequiredService<FakeAppContext>();
var fakeApp = appContext.AddApp(SharedInfo.AppKey);
appContext.SetCurrentApp(fakeApp);
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
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});
await app.RunAsync();