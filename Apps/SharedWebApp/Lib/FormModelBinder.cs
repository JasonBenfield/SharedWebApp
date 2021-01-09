using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using XTI_Forms;

namespace SharedWebApp.Lib
{
    public class FormModelBinder : IModelBinder
    {
        public async Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)
            {
                throw new ArgumentNullException(nameof(bindingContext));
            }
            var model = (Form)bindingContext.HttpContext.RequestServices.GetService(bindingContext.ModelType);
            if(model == null)
            {
                model = (Form)Activator.CreateInstance(bindingContext.ModelType);
            }
            var serialized = await new JsonFromRequest(bindingContext.HttpContext.Request).Serialize();
            var options = new JsonSerializerOptions();
            options.Converters.Add(new JsonObjectConverter());
            var values = JsonSerializer.Deserialize<ExpandoObject>(serialized, options);
            model.Import(values);
            bindingContext.Result = ModelBindingResult.Success(model);
        }
    }
}
