using XTI_App.Api;

namespace SharedWebApp.Api;

public sealed class ProductAction : AppAction<int, Product>
{
    public Task<Product> Execute(int id, CancellationToken ct)
    {
        return Task.FromResult(new Product { ID = id, Quantity = 2, Price = 23.42M });
    }
}