import { SimpleEvent } from "../Events";
import { SelectOption } from "../Components/SelectOption";
import { SimpleFieldFormGroupSelectView } from "../Views/FormGroup";
import { ConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";

export class DropDownFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    protected readonly view: SimpleFieldFormGroupSelectView;
    readonly constraints = new ConstraintCollection();
    private readonly _valueChanged = new SimpleEvent(this);
    readonly valueChanged = this._valueChanged.handler();
    private readonly items: SelectOption<TValue>[] = [];
    private itemCaption: string;

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupSelectView) {
        super(prefix, name, view);
        view.select.onChange().execute(() => this._valueChanged.invoke());
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }

    getValue() {
        const selectedIndex = this.view.select.getSelectedIndex();
        return selectedIndex > -1 ? this.items[selectedIndex].value : null;
    }

    setValue(value: TValue) {
        const selectedIndex = this.items.findIndex(o => o.value === value);
        this.view.select.setSelectedIndex(selectedIndex);
    }

    setItems(...items: SelectOption<TValue>[]) {
        this.items.splice(0, this.items.length, ...items);
        this.prependCaption();
        this.updateOptions();
    }

    setItemCaption(itemCaption: string) {
        if (this.itemCaption) {
            this.items.splice(0, 1);
        }
        this.itemCaption = itemCaption;
        this.prependCaption();
        this.updateOptions();
    }

    private prependCaption() {
        if (this.itemCaption) {
            this.items.splice(0, 0, new SelectOption<TValue>(null, this.itemCaption));
        }
    }

    private updateOptions() {
        const options = this.view.select.replaceOptions(this.items.length);
        let i = 0;
        for (const item of this.items) {
            options[i].setText(item.displayText);
            i++;
        }
    }
}