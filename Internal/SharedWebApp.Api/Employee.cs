﻿namespace SharedWebApp.Api;

public sealed class Employee
{
    public int ID { get; set; }
    public string Name { get; set; } = "";
    public DateTime BirthDate { get; set; }
    public EmployeeType EmployeeType { get; set; } = EmployeeType.Values.None;
}