import { SelectControl } from "../Components/SelectControl";
import { SelectOption } from "../Components/SelectOption";
import { DebouncedAction } from "../DebouncedAction";
import { EventBuilders } from "../Events";
import { SimpleFieldFormGroupSelectView } from "../Views/FormGroup";
import { ConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";

type Events<TValue> = { valueChanged: TValue };

export class DropDownFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    readonly constraints = new ConstraintCollection();
    private readonly selectControl: SelectControl<TValue>;
    readonly when: EventBuilders<Events<TValue>>;

    constructor(prefix: string, name: string, protected readonly view: SimpleFieldFormGroupSelectView) {
        super(prefix, name, view);
        this.selectControl = this.addComponent(new SelectControl(view.selectView));
        this.when = this.selectControl.when;
        this.selectControl.when.valueChanged.then(() => this.debouncedOnValueChanged.execute());
    }

    makeReadOnly() {
        const selectedOption = this.selectControl.getSelectedOption();
        const displayText = selectedOption ? selectedOption.displayText : '';
        this.selectControl.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(displayText);
    }

    makeEditable() {
        this.selectControl.show();
        this.valueTextComponent.hide();
    }

    private debouncedOnValueChanged = new DebouncedAction(
        this.onValueChanged.bind(this),
        700
    );

    private onValueChanged() {
        if (this.hasValidated) {
            this.validate(new ErrorList());
        }
    }

    protected setCustomValidity(errorMessage: string) {
        this.selectControl.setCustomValidity(errorMessage);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }

    getValue() {
        return this.selectControl.getValue();
    }

    setValue(value: TValue) {
        this.selectControl.setValue(value);
    }

    setItems(items: SelectOption<TValue>[]);
    setItems(caption: string, items: SelectOption<TValue>[]);
    setItems(captionOrOptions: string | SelectOption<TValue>[], items?: SelectOption<TValue>[]) {
        if (typeof captionOrOptions === 'string') {
            this.selectControl.setItems(captionOrOptions, items);
        }
        else {
            this.selectControl.setItems(captionOrOptions);
        }
    }

    setItemCaption(itemCaption: string) {
        this.selectControl.setItemCaption(itemCaption);
    }

    getSelectedOption() {
        return this.selectControl.getSelectedOption();
    }

    getSelectedIndex() {
        return this.selectControl.getSelectedIndex();
    }

    get options() { return this.selectControl.options; }
}