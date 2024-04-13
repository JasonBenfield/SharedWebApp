import { DataListOptionView } from "../Views/DataListOptionView";
import { BasicComponent } from "./BasicComponent";
import { DataListOption } from "./DataListOption";

export class DataListOptionComponent<TValue> extends BasicComponent {
    constructor(readonly option: DataListOption<TValue>, view: DataListOptionView) {
        super(view);
        view.setValue(option.displayText === null || option.displayText === undefined ? '' : `${option.displayText}`);
    }

    get value() { return this.option.value; }

    get displayText() { return this.option.displayText; }
}