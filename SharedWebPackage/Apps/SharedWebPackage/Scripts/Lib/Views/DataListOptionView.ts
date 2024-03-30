import { BasicComponentView } from "./BasicComponentView";
import { IOptionAttributes } from "./Types";

export class DataListOptionView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'option');
    }

    protected setAttr: (config: (attr: IOptionAttributes) => void) => void;

    setValue(value: string) {
        this.setAttr(a => a.value = value);
    }
}