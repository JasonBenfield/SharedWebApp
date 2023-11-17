import { AppClient } from "../Lib/Http/AppClient";
import { AppClientAction } from "../Lib/Http/AppClientAction";
import { AppClientEvents } from "../Lib/Http/AppClientEvents";
import { AppClientGroup } from "../Lib/Http/AppClientGroup";
import { AppClientQuery } from "../Lib/Http/AppClientQuery";
import { AppResourceUrl } from "../Lib/Http/AppResourceUrl";
import { AddEmployeeForm } from "./Employee/AddEmployeeForm";

interface IAddProductModel {
	Name: string;
	Quantity: number;
	Price: number;
	File: File;
	TimeAdded: Date;
	Nested: IAddProductNested;
}

interface IAddProductNested {
	MoreFiles: File[];
}

export class SharedAppClient extends AppClient {

    constructor(events: AppClientEvents) {
		super(events, 'Shared', 'Current');
		this.Employee = this.addGroup((evts, resourceUrl) => new EmployeeGroup(evts, resourceUrl));
		this.EmployeeQuery = this.addODataGroup((evts, resourceUrl) => new AppClientQuery<IEmptyRequest, IEmployee>(evts, resourceUrl.odata('EmployeeQuery'), 'EmployeeQuery'));
	}

	readonly Employee: EmployeeGroup;
	readonly EmployeeQuery: AppClientQuery<IEmptyRequest, IEmployee>;
}

export class EmployeeGroup extends AppClientGroup {
	constructor(events: AppClientEvents, resourceUrl: AppResourceUrl) {
		super(events, resourceUrl, 'Employee');
		this.TestAction = this.createAction<number, number>('Test', 'Test');
		this.AddEmployeeAction = this.createAction<AddEmployeeForm, number>('AddEmployee', 'Add Employee');
		this.AddProductAction = this.createAction<IAddProductModel, number>('AddProduct', 'Add Product');
	}

	readonly TestAction: AppClientAction<number, number>;
	readonly AddEmployeeAction: AppClientAction<AddEmployeeForm, number>;
	readonly AddProductAction: AppClientAction<IAddProductModel, number>;

	Test(model: number, errorOptions?: IActionErrorOptions) {
		return this.TestAction.execute(model, errorOptions || {});
	}

	AddEmployee(model: AddEmployeeForm, errorOptions?: IActionErrorOptions) {
		return this.AddEmployeeAction.execute(model, errorOptions || {});
	}

	AddProduct(model: IAddProductModel, errorOptions?: IActionErrorOptions) {
		return this.AddProductAction.execute(model, errorOptions || {});
	}
}