using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using XTI_Forms;

namespace SharedWebApp.Lib
{
    public sealed class FormModelBinderProvider : IModelBinderProvider
    {
        public IModelBinder GetBinder(ModelBinderProviderContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }
            if (typeof(Form).IsAssignableFrom( context.Metadata.ModelType))
            {
                return new FormModelBinder();
            }
            return null;
        }
    }
}
