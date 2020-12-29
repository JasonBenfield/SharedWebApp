using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace XTI_Forms
{
    public sealed class FormTemplate
    {
        public string Name { get; set; }
        public IFieldTemplate[] Fields { get; set; }
    }
}
