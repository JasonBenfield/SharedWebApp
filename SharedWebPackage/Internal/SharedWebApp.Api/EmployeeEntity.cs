namespace SharedWebApp.Api;

public sealed class EmployeeEntity
{
    public int ID { get; set; }
    public string EmployeeName { get; set; } = "";
    public DateTimeOffset DateHired { get; set; }
    public decimal Salary { get; set; }
    public string Department { get; set; } = "";
}
