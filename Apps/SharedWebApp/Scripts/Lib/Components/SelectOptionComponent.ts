import { SelectOptionView } from "../Views/SelectView";
import { BasicComponent } from "./BasicComponent";
import { SelectOption } from "./SelectOption";

export class SelectOptionComponent<TValue> extends BasicComponent {
    constructor(readonly option: SelectOption<TValue>, view: SelectOptionView) {
        super(view);
        view.setValue(option.value === null || option.value === undefined ? '' : `${option.value}`);
        view.setText(option.displayText);
    }

    get value() { return this.option.value; }

    get displayText() { return this.option.displayText; }
}