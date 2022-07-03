import { SimpleEvent } from "../Events";
import { SelectOption } from "../Components/SelectOption";
import { SimpleFieldFormGroupSelectView } from "../Views/FormGroup";
import { ConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";
import { SelectControl } from "../Components/SelectControl";

export class DropDownFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    protected readonly view: SimpleFieldFormGroupSelectView;
    readonly constraints = new ConstraintCollection();
    private readonly _valueChanged = new SimpleEvent(this);
    readonly valueChanged = this._valueChanged.handler();
    private readonly select: SelectControl<TValue>;

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupSelectView) {
        super(prefix, name, view);
        this.select = new SelectControl(view.select);
        this.select.when.valueChanged.then(() => this._valueChanged.invoke());
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }

    getValue() {
        return this.select.getValue();
    }

    setValue(value: TValue) {
        this.select.setValue(value);
    }

    setItems(...items: SelectOption<TValue>[]) {
        this.select.setItems(...items);
    }

    setItemCaption(itemCaption: string) {
        this.select.setItemCaption(itemCaption);
    }
}