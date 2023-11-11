import { SelectControl } from "../Components/SelectControl";
import { SelectOption } from "../Components/SelectOption";
import { EventBuilders } from "../Events";
import { SimpleFieldFormGroupSelectView } from "../Views/FormGroup";
import { ConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";

type Events<TValue> = { valueChanged: TValue };

export class DropDownFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    protected readonly view: SimpleFieldFormGroupSelectView;
    readonly constraints = new ConstraintCollection();
    readonly when: EventBuilders<Events<TValue>>;
    private readonly select: SelectControl<TValue>;

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupSelectView) {
        super(prefix, name, view);
        this.select = new SelectControl(view.select);
        this.when = this.select.when;
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