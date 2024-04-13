using XTI_App.Api;

namespace SharedWebApp.Api;

public sealed class SharedAppApiFactory : AppApiFactory
{
    private readonly IServiceProvider services;

    public SharedAppApiFactory(IServiceProvider services)
    {
        this.services = services;
    }

    protected override IAppApi _Create(IAppApiUser user) => new SharedAppApi(user, services);
}