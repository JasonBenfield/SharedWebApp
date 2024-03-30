using Microsoft.AspNetCore.Http;

namespace SharedWebApp.Api;

public sealed class AddProductModel
{
    public string Name { get; set; } = "";
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public DateTimeOffset TimeAdded { get; set; }
    public IFormFile? File { get; set; }
    public AddProductNested Nested { get; set; } = new AddProductNested();
}

public sealed class AddProductNested
{
    public IFormFile[] MoreFiles { get; set; } = new IFormFile[0];
}