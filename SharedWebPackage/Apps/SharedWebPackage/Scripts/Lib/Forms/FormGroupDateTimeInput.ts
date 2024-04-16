import { DateTimeInputControl } from "../Components/DateTimeInputControl";
import { TextComponent } from "../Components/TextComponent";
import { DateTimeOffset } from "../DateTimeOffset";
import { EventBuilders } from "../Events";
import { FormGroupDateTimeInputView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

type Events = { valueChanged: DateTimeOffset };

export class FormGroupDateTimeInput extends FormGroup {
    private readonly inputControl: DateTimeInputControl;
    private readonly valueTextComponent: TextComponent;

    readonly when: EventBuilders<Events>;

    constructor(view: FormGroupDateTimeInputView) {
        super(view);
        this.inputControl = this.addComponent(new DateTimeInputControl(view.dateTimeInputView));
        this.when = this.inputControl.when;
        this.setLabelFor(this.inputControl);
        this.valueTextComponent = this.addComponent(new TextComponent(view.valueTextView));
    }
    
    makeReadOnly(format: (date: DateTimeOffset) => string = FormGroupDateTimeInput.defaultReadOnlyFormat) {
        const value = this.inputControl.getValue();
        this.inputControl.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(format(value));
    }

    private static readonly defaultReadOnlyFormat = (value: DateTimeOffset) => value ? value.toLocaleString() : '';

    makeEditable() {
        this.inputControl.show();
        this.valueTextComponent.hide();
    }

    getValue() { return this.inputControl.getValue(); }

    setValue(value: DateTimeOffset) {
        this.inputControl.setValue(value);
    }
}