using System.Threading.Tasks;
using XTI_App;
using XTI_App.Abstractions;
using XTI_App.Api;
using XTI_App.EfApi;
using XTI_Core;

namespace SharedWebApp.Api
{
    public sealed class SharedAppSetup
    {
        private readonly AppFactory factory;
        private readonly Clock clock;
        private readonly AppApiFactory apiFactory;

        public SharedAppSetup(AppFactory factory, Clock clock, AppApiFactory apiFactory)
        {
            this.factory = factory;
            this.clock = clock;
            this.apiFactory = apiFactory;
        }

        public async Task Run()
        {
            await new AllAppSetup(factory, clock).Run();
            var apiTemplate = apiFactory.CreateTemplate();
            await new DefaultAppSetup(factory, clock, apiTemplate, "").Run(AppVersionKey.Current);
        }
    }
}
