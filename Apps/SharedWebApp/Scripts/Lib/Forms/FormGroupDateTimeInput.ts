import { DateTimeInputControl } from "../Components/DateTimeInputControl";
import { TextComponent } from "../Components/TextComponent";
import { FormGroupDateTimeInputView } from "../Views/FormGroup";
import { DateTimeConstraintCollection } from "./ConstraintCollection";
import { FormGroup } from "./FormGroup";

export class FormGroupDateTimeInput extends FormGroup {
    readonly constraints = new DateTimeConstraintCollection();
    private readonly inputControl: DateTimeInputControl;
    private readonly valueTextComponent: TextComponent;

    constructor(view: FormGroupDateTimeInputView) {
        super(view);
        this.inputControl = this.addComponent(new DateTimeInputControl(view.dateTimeInput));
        this.valueTextComponent = this.addComponent(new TextComponent(view.valueTextView));
    }

    makeReadOnly(format: (date: Date) => string = FormGroupDateTimeInput.defaultReadOnlyFormat) {
        const value = this.inputControl.getValue();
        this.inputControl.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(format(value));
    }

    private static readonly defaultReadOnlyFormat = (value: Date) => value ? value.toLocaleString() : '';

    makeEditable() {
        this.inputControl.show();
        this.valueTextComponent.hide();
    }

    getValue() { return this.inputControl.getValue(); }

    setValue(value: Date) {
        this.inputControl.setValue(value);
    }
}