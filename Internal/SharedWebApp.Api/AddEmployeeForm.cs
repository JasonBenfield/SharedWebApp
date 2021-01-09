using System;
using XTI_Forms;

namespace SharedWebApp.Api
{
    public sealed class AddEmployeeForm : Form
    {
        public AddEmployeeForm() : base("AddEmployeeForm")
        {
            Name = AddTextInput(nameof(Name));
            Name.MaxLength = 100;
            Name.SetValue("");
            BirthDate = AddDateInput(nameof(BirthDate));
            Department = AddInt32DropDown
            (
                nameof(Department),
                new DropDownItem<int?>(1, "HR"),
                new DropDownItem<int?>(2, "IT")
            );
            Department.ItemCaption = "Select...";
            Department.MustNotBeNull();
            Address = AddComplex(nameof(Address), (p, n) => new AddressInput(p, n, null));
        }

        public InputField<string> Name { get; }
        public InputField<DateTimeOffset?> BirthDate { get; }
        public DropDownField<int?> Department { get; }
        public AddressInput Address { get; }
    }

}
