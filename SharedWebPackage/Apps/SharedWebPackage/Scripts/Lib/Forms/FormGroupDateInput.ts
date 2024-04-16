import { DateInputControl } from "../Components/DateInputControl";
import { TextComponent } from "../Components/TextComponent";
import { DateOnly } from "../DateOnly";
import { EventBuilders } from "../Events";
import { FormGroupInputGroupView, FormGroupInputView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

type Events = { valueChanged: DateOnly };

export class FormGroupDateInput extends FormGroup {
    private readonly dateInputControl: DateInputControl;
    private readonly valueTextComponent: TextComponent;

    readonly when: EventBuilders<Events>;

    constructor(view: FormGroupInputView | FormGroupInputGroupView) {
        super(view);
        this.dateInputControl = this.addComponent(new DateInputControl(view.inputView));
        this.when = this.dateInputControl.when;
        this.setLabelFor(this.dateInputControl);
        this.valueTextComponent = this.addComponent(new TextComponent(view.valueTextView));
    }
    
    makeReadOnly(format: (date: DateOnly) => string = FormGroupDateInput.defaultReadOnlyFormat) {
        const value = this.dateInputControl.getValue();
        this.dateInputControl.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(format(value));
    }

    private static readonly defaultReadOnlyFormat = (value: DateOnly) => value ? value.toLocaleString() : '';

    makeEditable() {
        this.dateInputControl.show();
        this.valueTextComponent.hide();
    }

    required() {
        this.dateInputControl.required();
    }

    notRequired() {
        this.dateInputControl.notRequired();
    }

    setCustomValidity(message: string) {
        this.dateInputControl.setCustomValidity(message);
    }

    getValue() { return this.dateInputControl.getValue(); }

    setValue(value: DateOnly) {
        this.dateInputControl.setValue(value);
    }
}