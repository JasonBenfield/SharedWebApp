using XTI_App.Api;

namespace SharedWebApp.Api
{
    public sealed class SharedAppApiFactory : AppApiFactory
    {
        protected override IAppApi _Create(IAppApiUser user) => new SharedAppApi(user);
    }
}
