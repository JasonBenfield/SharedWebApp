using XTI_App.Abstractions;
using XTI_App.Fakes;
using XTI_Core;
using XTI_Core.Extensions;
using XTI_WebApp.Abstractions;
using XTI_WebApp.Api;
using XTI_WebApp.Extensions;
using XTI_WebApp.Fakes;
using XtiCoreWebPackage;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.UseXtiConfiguration(builder.Environment, "", "", []);
builder.Services.AddSingleton(_ => XtiEnvironment.Parse(builder.Environment.EnvironmentName));
builder.Services.AddFakesForXtiWebApp();
builder.Services.AddSingleton(_ => AppKey.WebApp("Fake"));
builder.Services.AddScoped<ITransformedLinkFactory, DefaultTransformedLinkFactory>();
builder.Services.AddScoped<XtiAuthenticationOptions>();
builder.Services.AddScoped<AppClients>();
builder.Services.AddScoped<AppClientDomainSelector>();
builder.Services.AddScoped<XtiAuthenticationOptions>();
builder.Services.AddScoped<AppClients>();
builder.Services.AddScoped<AppClientDomainSelector>();
builder.Services.AddScoped<IAppClientDomain, AppClientDomainSelector>();
builder.Services.AddSingleton<InstallationIDAccessor, FakeInstallationIDAccessor>();
builder.Services.AddSingleton<IPageContext, FakePageContext>();
builder.Services.AddResponseCaching();
builder.Services.AddSingleton<AppPageModel>();
builder.Services
    .AddMvc()
    .AddJsonOptions(options =>
    {
        options.SetDefaultJsonOptions();
    })
    .AddMvcOptions(options =>
    {
        options.SetDefaultMvcOptions();
    });

var app = builder.Build();
var sp = app.Services.CreateScope().ServiceProvider;
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