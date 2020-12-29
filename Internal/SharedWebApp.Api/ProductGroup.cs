using XTI_App;
using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api
{
    public sealed class ProductGroup : AppApiGroup
    {
        public ProductGroup(AppApi api, IAppApiUser user)
            : base
            (
                api,
                new NameFromGroupClassName(nameof(ProductGroup)).Value,
                ModifierCategoryName.Default,
                api.Access,
                user,
                (n, a, u) => new WebAppApiActionCollection(n, a, u)
            )
        {
            var actions = Actions<WebAppApiActionCollection>();
            Index = actions.AddDefaultView();
            GetInfo = actions.AddAction
            (
                "GetInfo",
                () => new GetInfoAction()
            );
            AddProduct = actions.AddAction
            (
                "AddProduct",
                () => new AddProductValidation(),
                () => new AddProductAction()
            );
            Product = actions.AddAction
            (
                "Product",
                () => new ProductAction(),
                "Get Product Information"
            );
        }
        public AppApiAction<EmptyRequest, AppActionViewResult> Index { get; }
        public AppApiAction<EmptyRequest, string> GetInfo { get; }
        public AppApiAction<AddProductModel, int> AddProduct { get; }
        public AppApiAction<int, Product> Product { get; }
    }

}
