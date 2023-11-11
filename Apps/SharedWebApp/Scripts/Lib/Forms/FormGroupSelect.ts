import { SelectControl } from "../Components/SelectControl";
import { SelectOption } from "../Components/SelectOption";
import { FormGroupSelectGroupView, FormGroupSelectView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupSelect<TValue> extends FormGroup {
    private readonly selectControl: SelectControl<TValue>;

    constructor(view: FormGroupSelectView | FormGroupSelectGroupView) {
        super(view);
        this.selectControl = this.addComponent(new SelectControl(view.select));
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