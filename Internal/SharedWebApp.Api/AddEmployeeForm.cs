using System;
using XTI_Forms;

namespace SharedWebApp.Api
{
    public sealed class AddEmployeeForm : Form
    {
        public AddEmployeeForm() 
            : base("AddEmployeeForm")
        {
        }

        public string Name { get; set; }
        public DateTimeOffset BirthDate { get; set; }
        public int[] Departments { get; set; }
    }

}
