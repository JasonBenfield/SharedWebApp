import { SelectControl } from "../Components/SelectControl";
import { SelectOption } from "../Components/SelectOption";
import { TextComponent } from "../Components/TextComponent";
import { FormGroupSelectGroupView, FormGroupSelectView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupSelect<TValue> extends FormGroup {
    private readonly selectControl: SelectControl<TValue>;
    private readonly valueTextComponent: TextComponent;

    constructor(view: FormGroupSelectView | FormGroupSelectGroupView) {
        super(view);
        this.selectControl = this.addComponent(new SelectControl(view.select));
        this.valueTextComponent = this.addComponent(new TextComponent(view.valueTextView));
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

    required() {
        this.selectControl.required();
    }

    notRequired() {
        this.selectControl.notRequired();
    }

    setCustomValidity(message: string) {
        this.selectControl.setCustomValidity(message);
    }

    getValue() { return this.selectControl.getValue(); }

    setValue(value: TValue) {
        this.selectControl.setValue(value);
    }

    setItems(...items: SelectOption<TValue>[]) {
        this.selectControl.setItems(...items);
    }

    setItemCaption(itemCaption: string) {
        this.selectControl.setItemCaption(itemCaption);
    }

}