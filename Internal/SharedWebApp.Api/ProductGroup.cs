using XTI_App.Api;
using XTI_WebApp.Api;

namespace SharedWebApp.Api
{
    public sealed class ProductGroup : AppApiGroupWrapper
    {
        public ProductGroup(AppApiGroup source)
            : base(source)
        {
            var actions = new WebAppApiActionFactory(source);
            Index = source.AddAction(actions.DefaultView());
            GetInfo = source.AddAction
            (
                actions.Action
                (
                    nameof(GetInfo),
                    () => new GetInfoAction()
                )
            );
            AddProduct = source.AddAction
            (
                actions.Action
                (
                    nameof(AddProduct),
                    () => new AddProductValidation(),
                    () => new AddProductAction()
                )
            );
            Product = source.AddAction
            (
                actions.Action
                (
                    nameof(Product),
                    () => new ProductAction(),
                    "Get Product Information"
                )
            );
        }
        public AppApiAction<EmptyRequest, WebViewResult> Index { get; }
        public AppApiAction<EmptyRequest, string> GetInfo { get; }
        public AppApiAction<AddProductModel, int> AddProduct { get; }
        public AppApiAction<int, Product> Product { get; }
    }

}
