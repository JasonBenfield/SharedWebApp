import { TextComponent } from "../Components/TextComponent";
import { TimeSpanInputControl } from "../Components/TimeSpanInputControl";
import { EventBuilders } from "../Events";
import { TimeSpan } from "../TimeSpan";
import { FormGroupTimeSpanInputView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

type Events = { valueChanged: TimeSpan };

export class FormGroupTimeSpanInput extends FormGroup {
    private readonly inputControl: TimeSpanInputControl;
    private readonly valueTextComponent: TextComponent;

    readonly when: EventBuilders<Events>;

    constructor(view: FormGroupTimeSpanInputView) {
        super(view);
        this.inputControl = this.addComponent(new TimeSpanInputControl(view.timeSpanInputView));
        this.when = this.inputControl.when;
        this.setLabelFor(this.inputControl);
        this.valueTextComponent = this.addComponent(new TextComponent(view.valueTextView));
    }
    
    makeReadOnly(format: (time: TimeSpan) => string = FormGroupTimeSpanInput.defaultReadOnlyFormat) {
        const value = this.inputControl.getValue();
        this.inputControl.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(format(value));
    }

    private static readonly defaultReadOnlyFormat = (value: TimeSpan) => value ? value.format() : '';

    makeEditable() {
        this.inputControl.show();
        this.valueTextComponent.hide();
    }

    required() {
        this.inputControl.required();
    }

    notRequired() {
        this.inputControl.notRequired();
    }

    includeDays() {
        this.inputControl.includeDays();
    }

    excludeDays() {
        this.inputControl.excludeDays();
    }

    includeHours() {
        this.inputControl.includeHours();
    }

    excludeHours() {
        this.inputControl.excludeHours();
    }

    includeMinutes() {
        this.inputControl.includeMinutes();
    }

    excludeMinutes() {
        this.inputControl.excludeMinutes();
    }

    includeSeconds() {
        this.inputControl.includeSeconds();
    }

    excludeSeconds() {
        this.inputControl.excludeSeconds();
    }

    includeMillieconds() {
        this.inputControl.includeMillieconds();
    }

    excludeMilliseconds() {
        this.inputControl.excludeMilliseconds();
    }

    setCustomValidity(message: string) {
        this.inputControl.setCustomValidity(message);
    }

    setFocus(delay = 0) { this.inputControl.setFocus(delay); }

    getValue() { return this.inputControl.getValue(); }

    setValue(value: TimeSpan) {
        this.inputControl.setValue(value);
    }
}