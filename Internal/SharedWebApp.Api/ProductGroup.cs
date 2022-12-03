using Microsoft.Extensions.DependencyInjection;
using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api;

public sealed class ProductGroup : AppApiGroupWrapper
{
    public ProductGroup(AppApiGroup source, IServiceProvider sp)
        : base(source)
    {
        Index = source.AddAction(nameof(Index), () => new ProductIndexAction(sp.GetRequiredService<WebViewResultFactory>()));
        GetInfo = source.AddAction
        (
            nameof(GetInfo),
            () => new GetInfoAction()
        );
        AddProduct = source.AddAction
        (
            nameof(AddProduct),
            () => new AddProductAction(),
            () => new AddProductValidation()
        );
        Product = source.AddAction
        (
            nameof(Product),
            () => new ProductAction(),
            friendlyName: "Get Product Information"
        );
    }
    public AppApiAction<EmptyRequest, WebViewResult> Index { get; }
    public AppApiAction<EmptyRequest, string> GetInfo { get; }
    public AppApiAction<AddProductModel, int> AddProduct { get; }
    public AppApiAction<int, Product> Product { get; }
}