using System;
using XTI_Forms;

namespace SharedWebApp.Api
{
    public sealed class AddEmployeeForm : Form
    {
        public AddEmployeeForm() : base("AddEmployeeForm")
        {
            EmployeeName = AddTextInput(nameof(EmployeeName));
            EmployeeName.MaxLength = 100;
            EmployeeName.SetValue("");
            BirthDate = AddDateInput(nameof(BirthDate));
            Department = AddInt32DropDown
            (
                nameof(Department),
                new DropDownItem<int?>(1, "HR"),
                new DropDownItem<int?>(2, "IT")
            );
            Department.ItemCaption = "Select...";
            Department.MustNotBeNull();
            Address = AddComplex(nameof(Address), (p, n) => new AddressInput(p, n));
        }

        public InputField<string> EmployeeName { get; }
        public InputField<DateTimeOffset?> BirthDate { get; }
        public DropDownField<int?> Department { get; }
        public AddressInput Address { get; }
    }

}
