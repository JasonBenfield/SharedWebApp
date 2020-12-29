using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace XTI_Forms
{
    public sealed class TextInput
    {
        private readonly string key;

        public TextInput(string prefix, string name)
        {
            key = $"{prefix}_{name}";
        }

        public string Value()
        {
            return null;
        }

        public TextInputTemplate ToTemplate() => new TextInputTemplate
        {
            Key = key,
            MaxLength = 0
        };
    }
}
