using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api;

public sealed class SharedAppApi : WebAppApiWrapper
{
    public SharedAppApi(IAppApiUser user, IServiceProvider sp)
        : base
        (
            new AppApi
            (
                SharedInfo.AppKey, 
                user, 
                ResourceAccess.AllowAnonymous()
            ),
            sp
        )
    {
        Employee = new EmployeeGroup
        (
            source.AddGroup(nameof(Employee))
        );
        Product = new ProductGroup
        (
            source.AddGroup(nameof(Product))
        );
    }
    public EmployeeGroup Employee { get; }
    public ProductGroup Product { get; }
}