using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api
{
    public sealed class SharedAppApi : WebAppApi
    {
        public SharedAppApi(IAppApiUser user, ResourceAccess access = null)
            : base(SharedAppKey.AppKey, user, access)
        {
            Employee = AddGroup(u => new EmployeeGroup(this, u));
            Product = AddGroup(u => new ProductGroup(this, u));
        }
        public EmployeeGroup Employee { get; }
        public ProductGroup Product { get; }
    }
}
