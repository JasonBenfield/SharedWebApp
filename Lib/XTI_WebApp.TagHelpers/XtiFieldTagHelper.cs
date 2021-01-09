using Microsoft.AspNetCore.Razor.TagHelpers;
using XTI_Forms;

namespace XTI_WebApp.TagHelpers
{
    [HtmlTargetElement("xti-field")]
    public class XtiFieldTagHelper : TagHelper
    {
        public XtiFieldTagHelper()
        {
        }

        [HtmlAttributeName("field")]
        public IField Field { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "";
            output.PreContent.AppendHtml($"<!-- ko with: {Field.Name} -->");
            output.PreContent.AppendHtml("<!-- ko component: { name: componentName, params: $data } --><!-- /ko -->");
            output.PostContent.AppendHtml("<!-- /ko -->");
        }
    }
}
