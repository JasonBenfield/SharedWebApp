import { DropdownComponent } from "../Dropdown/DropdownComponent";
import { ErrorModel } from "../ErrorModel";
import { ListGroup } from "../ListGroup/ListGroup";
import { ErrorList } from "./ErrorList";
import { ErrorListItem } from "./ErrorListItem";
import { ErrorListItemView } from "./ErrorListItemView";
import { SimpleFieldFormGroupView } from "./SimpleFieldFormGroupView";

export abstract class SimpleFieldFormGroup<TValue> implements IField {
    private readonly name: string;
    private readonly caption: string;
    private readonly alertList: ListGroup;

    constructor(prefix: string, name: string, protected readonly view: SimpleFieldFormGroupView) {
        this.name = prefix ? `${prefix}_${name}` : name;
        this.alertList = new ListGroup(this.view.alertList);
    }

    getName() {
        return this.name;
    }

    abstract getValue(): TValue;

    abstract setValue(value: TValue);

    getCaption() {
        return this.caption;
    }

    setCaption(caption: string) {
        this.view.setCaption(caption);
    }

    getField(name: string) { return this.getName() === name ? this : null; }

    setErrors(errors: ErrorModel[]) {
        this.alertList.setItems(
            errors,
            (e: ErrorModel, li: ErrorListItemView) => new ErrorListItem(e, li)
        );
        if (errors.length > 0) {
            this.view.showDropDown();
        }
        else {
            this.view.hideDropDown();
        }
    }

    clearErrors() {
        this.setErrors([]);
    }

    validate(errors: IErrorList) {
        let fieldErrors = new ErrorList();
        this.validateConstraints(fieldErrors);
        this.setErrors(fieldErrors.values());
        errors.merge(fieldErrors);
    }

    protected abstract validateConstraints(fieldErrors: ErrorList);

    import(values: Record<string, any>) {
        if (values) {
            let value = values[this.getName()];
            if (value !== undefined) {
                this.setValue(value);
            }
        }
    }

    export(values: Record<string, any>) {
        values[this.getName()] = this.getValue();
    }
}