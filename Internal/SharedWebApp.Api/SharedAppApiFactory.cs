using XTI_App.Api;

namespace SharedWebApp.Api
{
    public sealed class SharedAppApiFactory : AppApiFactory
    {
        protected override AppApi _Create(IAppApiUser user) => new SharedAppApi(user);
    }
}
