import { AppApi } from "../Lib/Api/AppApi";
import { AppApiAction } from "../Lib/Api/AppApiAction";
import { AppApiEvents } from "../Lib/Api/AppApiEvents";
import { AppApiGroup } from "../Lib/Api/AppApiGroup";
import { AppApiQuery } from "../Lib/Api/AppApiQuery";
import { AppResourceUrl } from "../Lib/Api/AppResourceUrl";
import { AddEmployeeForm } from "./Employee/AddEmployeeForm";

export class SharedAppApi extends AppApi {

    constructor(events: AppApiEvents) {
		super(events, 'Shared');
		this.Employee = this.addGroup((evts, resourceUrl) => new EmployeeGroup(evts, resourceUrl));
		this.EmployeeQuery = this.addODataGroup((evts, resourceUrl) => new AppApiQuery<IEmptyRequest, IEmployee>(evts, resourceUrl.odata('EmployeeQuery'), 'EmployeeQuery'));
	}

	readonly Employee: EmployeeGroup;
	readonly EmployeeQuery: AppApiQuery<IEmptyRequest, IEmployee>;
}

export class EmployeeGroup extends AppApiGroup {
	constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
		super(events, resourceUrl, 'Employee');
		this.TestAction = this.createAction<number, number>('Test', 'Test');
		this.AddEmployeeAction = this.createAction<AddEmployeeForm, number>('AddEmployee', 'Add Employee');
	}

	readonly TestAction: AppApiAction<number, number>;
	readonly AddEmployeeAction: AppApiAction<AddEmployeeForm, number>;

	Test(model: number, errorOptions?: IActionErrorOptions) {
		return this.TestAction.execute(model, errorOptions || {});
	}

	AddEmployee(model: AddEmployeeForm, errorOptions?: IActionErrorOptions) {
		return this.AddEmployeeAction.execute(model, errorOptions || {});
	}
}