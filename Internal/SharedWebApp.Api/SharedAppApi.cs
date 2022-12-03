using XTI_App.Api;
using XTI_ODataQuery.Api;
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
        Home = new HomeGroup
        (
            source.AddGroup(nameof(Home)),
            sp
        );
        Employee = new EmployeeGroup
        (
            source.AddGroup(nameof(Employee)),
            sp
        );
        EmployeeQuery = new ODataGroup<EmptyRequest, EmployeeEntity>
        (
            source.AddGroup(nameof(EmployeeQuery)),
            () => new EmployeeQueryAction()
        );
        Product = new ProductGroup
        (
            source.AddGroup(nameof(Product)),
            sp
        );
    }
    public HomeGroup Home { get; }
    public EmployeeGroup Employee { get; }
    public ODataGroup<EmptyRequest, EmployeeEntity> EmployeeQuery { get; }
    public ProductGroup Product { get; }
}