using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace XTI_Forms
{
    public sealed class TextInputTemplate : IFieldTemplate
    {
        public string Key { get; set; }
        public int? MaxLength { get; set; }
    }
}
