import { FormCheck } from "../Components/FormCheck";
import { TextComponent } from "../Components/TextComponent";
import { EventBuilders } from "../Events";
import { FormGroupFormCheckView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

type Events = { valueChanged: boolean };

export class FormGroupFormCheck extends FormGroup {
    private readonly formCheck: FormCheck;
    private readonly valueTextComponent: TextComponent;

    readonly when: EventBuilders<Events>;

    constructor(view: FormGroupFormCheckView) {
        super(view);
        this.formCheck = this.addComponent(new FormCheck(view.formCheckView));
        this.when = this.formCheck.when;
        this.setLabelFor(this.formCheck.getCheckboxViewID());
        this.valueTextComponent = this.addComponent(new TextComponent(view.valueTextView));
    }

    makeReadOnly(format: (date: boolean) => string = FormGroupFormCheck.defaultReadOnlyFormat) {
        const value = this.formCheck.getValue();
        this.formCheck.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(format(value));
    }

    private static readonly defaultReadOnlyFormat = (value: boolean) => value ? value.toLocaleString() : '';

    makeEditable() {
        this.formCheck.show();
        this.valueTextComponent.hide();
    }

    getValue() { return this.formCheck.getValue(); }

    setValue(value: boolean) {
        this.formCheck.setValue(value);
    }

    setText(text: string) {
        this.formCheck.setText(text);
    }

}