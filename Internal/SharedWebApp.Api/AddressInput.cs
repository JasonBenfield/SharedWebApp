using XTI_Forms;

namespace SharedWebApp.Api
{
    public sealed class AddressInput : ComplexField
    {
        public AddressInput(string prefix, string name, string caption = null)
            : base(prefix, name, caption)
        {
            Line1 = AddTextInput(nameof(Line1));
            Line1.MaxLength = 30;
            City = AddTextInput(nameof(City));
            State = AddTextInput(nameof(State));
            Zip = AddInt32Input(nameof(Zip));
        }

        public InputField<string> Line1 { get; }
        public InputField<string> City { get; }
        public InputField<string> State { get; }
        public InputField<int?> Zip { get; }
    }
}
