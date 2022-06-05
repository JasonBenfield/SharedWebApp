using SharedWebApp.Api;
using XTI_App.Abstractions;
using XTI_App.Api;
using XTI_App.Fakes;
using XTI_Configuration.Extensions;
using XTI_WebApp.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.UseXtiConfiguration(builder.Environment, new string[0]);

builder.Services.AddWebAppServices();
builder.Services.AddScoped(_ =>
{
    var appContext = new FakeAppContext(SharedInfo.AppKey);
    return appContext;
});
builder.Services.AddScoped<ISourceAppContext>(sp => sp.GetRequiredService<FakeAppContext>());
builder.Services.AddScoped<FakeCurrentUserName>();
builder.Services.AddScoped<ICurrentUserName>(sp => sp.GetRequiredService<FakeCurrentUserName>());
builder.Services.AddScoped<ISourceUserContext>(sp =>
{
    var appContext = sp.GetRequiredService<FakeAppContext>();
    var currentUserName = sp.GetRequiredService<FakeCurrentUserName>();
    var userContext = new FakeUserContext(appContext, currentUserName);
    userContext.SetCurrentUser(AppUserName.Anon);
    return userContext;
});
builder.Services.AddSingleton(_ => SharedInfo.AppKey);
builder.Services.AddSingleton<AppApiFactory, SharedAppApiFactory>();
builder.Services.AddResponseCaching();
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