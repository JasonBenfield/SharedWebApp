using NUnit.Framework;
using SharedWebApp.Api;

namespace XTI_Forms.Tests
{
    public class Tests
    {
        [Test]
        public void ShouldAddTextInputToTemplate()
        {
            var form = new AddEmployeeForm();
            var template = form.ToTemplate();
            Assert.That(template.Fields.Length, Is.GreaterThan(0));
        }
    }
}