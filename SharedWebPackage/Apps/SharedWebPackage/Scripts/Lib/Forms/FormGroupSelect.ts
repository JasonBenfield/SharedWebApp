import { SelectControl } from "../Components/SelectControl";
import { SelectOption } from "../Components/SelectOption";
import { TextComponent } from "../Components/TextComponent";
import { EventBuilders } from "../Events";
import { FormGroupSelectGroupView, FormGroupSelectView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

type Events<TValue> = { valueChanged: TValue };

export class FormGroupSelect<TValue> extends FormGroup {
    private readonly selectControl: SelectControl<TValue>;
    private readonly valueTextComponent: TextComponent;

    readonly when: EventBuilders<Events<TValue>>;

    constructor(view: FormGroupSelectView | FormGroupSelectGroupView) {
        super(view);
        this.selectControl = this.addComponent(new SelectControl(view.select));
        this.when = this.selectControl.when;
        this.valueTextComponent = this.addComponent(new TextComponent(view.valueTextView));
    }

    makeReadOnly(format?: (option: SelectOption<TValue>) => string) {
        const selectedOption = this.selectControl.getSelectedOption();
        if (!format) {
            format = this.defaultFormat;
        }
        const displayText = format(selectedOption);
        this.selectControl.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(displayText);
    }

    private defaultFormat: (option: SelectOption<TValue>) => string = (option) => {
        return option && option.value ? option.displayText : '';
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