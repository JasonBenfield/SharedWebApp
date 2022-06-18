import { ODataColumnBuilder } from "../../Lib/OData/ODataColumnBuilder";
import { ODataColumnViewBuilder } from "../../Lib/OData/ODataColumnViewBuilder";
import { SourceType } from "../../Lib/OData/SourceType";
import { ODataColumns } from "../../Lib/OData/Types";

export class ODataEmployeeColumnViewsBuilder {
    readonly ID = new ODataColumnViewBuilder();
    readonly EmployeeName = new ODataColumnViewBuilder();
    readonly DateHired = new ODataColumnViewBuilder();
    readonly Salary = new ODataColumnViewBuilder();
}

export class ODataEmployeeColumnsBuilder {
    constructor(views: ODataEmployeeColumnViewsBuilder) {
        this.ID = new ODataColumnBuilder('ID', new SourceType('Int32'), views.ID);
        this.EmployeeName = new ODataColumnBuilder('EmployeeName', new SourceType('String'), views.EmployeeName);
        this.DateHired = new ODataColumnBuilder('DateHired', new SourceType('DateTimeOffset'), views.DateHired);
        this.Salary = new ODataColumnBuilder('Salary', new SourceType('Decimal'), views.Salary);
    }

    readonly ID: ODataColumnBuilder;
    readonly EmployeeName: ODataColumnBuilder;
    readonly DateHired: ODataColumnBuilder;
    readonly Salary: ODataColumnBuilder;

    build() {
        return {
            ID: this.ID.build(),
            EmployeeName: this.EmployeeName.build(),
            DateHired: this.DateHired.build(),
            Salary: this.Salary.build()
        } as ODataColumns<IEmployee>;
    }
}