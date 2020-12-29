using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace XTI_Forms
{
    public class Form
    {
        private readonly string name;

        public Form(string name)
        {
            this.name = name;
        }

        public FormTemplate ToTemplate() => new FormTemplate
        {
            Name = name,
            Fields = new IFieldTemplate[] { }
        };
    }
}
