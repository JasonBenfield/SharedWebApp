using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SharedWebApp.Api;
using XTI_App.Abstractions;
using XTI_App.Api;
using XTI_App.Fakes;
using XTI_WebApp.Extensions;

namespace SharedWebApp
{
    public sealed class Startup
    {
        private readonly IHostEnvironment hostEnv;

        public Startup(IHostEnvironment hostEnv, IConfiguration configuration)
        {
            this.hostEnv = hostEnv;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddWebAppServices(hostEnv, Configuration);
            services.AddScoped(_ =>
            {
                var appContext = new FakeAppContext();
                var app = appContext.AddApp("Shared");
                appContext.SetCurrentApp(app);
                return appContext;
            });
            services.AddScoped<ISourceAppContext>(sp => sp.GetService<FakeAppContext>());
            services.AddScoped<ISourceUserContext>(sp =>
            {
                var appContext = sp.GetService<FakeAppContext>();
                var userContext = new FakeUserContext(appContext);
                userContext.SetCurrentUser(AppUserName.Anon);
                return userContext;
            });
            services.AddSingleton(_ => SharedAppKey.AppKey);
            services.AddSingleton<AppApiFactory, SharedAppApiFactory>();
            services.AddResponseCaching();
            services
                .AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SetDefaultJsonOptions();
                })
                .AddMvcOptions(options =>
                {
                    options.SetDefaultMvcOptions();
                });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
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
        }
    }
}
