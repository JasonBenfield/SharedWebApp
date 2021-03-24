import { Alert } from "../Alert";
import { ContextualClass } from "../ContextualClass";
import { DropdownComponent } from "../Dropdown/DropdownComponent";
import { ErrorModel } from "../ErrorModel";
import { FaIcon } from "../FaIcon";
import { BlockViewModel } from "../Html/BlockViewModel";
import { TextSpan } from "../Html/TextSpan";
import { ListGroup } from "../ListGroup/ListGroup";
import { MarginCss } from "../MarginCss";
import { ErrorList } from "./ErrorList";
import { FormGroup } from "../Html/FormGroup";
import { PaddingCss } from "../PaddingCss";

export abstract class SimpleFieldFormGroup<TValue> extends FormGroup implements IField {
    constructor(prefix: string, name: string, vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.name = prefix ? `${prefix}_${name}` : name;
        this.dropdown = this.inputGroup.addContent(new DropdownComponent());
        this.dropdown.hide();
        this.dropdown.button.setContext(ContextualClass.danger);
        this.dropdown.button.useOutlineStyle();
        this.dropdown.button.addContent(new FaIcon('exclamation'))
            .configure(i => {
                i.solidStyle();
            });
        this.dropdown.menu.setPadding(PaddingCss.xs(0));
        let alertItem = this.dropdown.menu.addItem();
        alertItem.addCssName(ContextualClass.danger.append('border'));
        let alert = alertItem.addContent(new Alert());
        alert.setMargin(MarginCss.xs(0));
        alert.setContext(ContextualClass.danger);
        this.alertList = alert.addContent(new ListGroup());
    }

    private readonly name: string;

    getName() {
        return this.name;
    }

    abstract getValue(): TValue;

    abstract setValue(value: TValue);

    private readonly dropdown: DropdownComponent;

    private readonly alertList: ListGroup;

    getField(name: string) { return this.getName() === name ? this : null; }

    setErrors(errors: ErrorModel[]) {
        this.alertList.setItems(
            errors,
            (e, li) => {
                li.addCssName('dropdown-item-text');
                li.addCssName(ContextualClass.danger.append('text'));
                li.addContent(new TextSpan(e.Message));
            }
        );
        if (errors.length > 0) {
            this.dropdown.show();
        }
        else {
            this.dropdown.hide();
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