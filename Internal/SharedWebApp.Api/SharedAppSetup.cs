using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using XTI_App;
using XTI_App.Api;
using XTI_Core;

namespace SharedWebApp.Api
{
    public sealed class SharedAppSetup
    {
        private readonly AppFactory factory;
        private readonly Clock clock;

        public SharedAppSetup(AppFactory factory, Clock clock)
        {
            this.factory = factory;
            this.clock = clock;
        }

        public async Task Run()
        {
            await new AllAppSetup(factory, clock).Run();
            var apiFactory = new SharedAppApiFactory();
            var apiTemplate = apiFactory.CreateTemplate();
            await new DefaultAppSetup(factory, clock, apiTemplate, "").Run();
        }
    }
}
