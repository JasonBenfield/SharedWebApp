import { FormGroup } from "./FormGroup";
import { TextBlock } from "./TextBlock";
import { TextValueFormGroupView } from "./TextValueFormGroupView";

export class TextValueFormGroup extends FormGroup {
    private value: string;
    private readonly valueText: TextBlock;

    constructor(view: TextValueFormGroupView) {
        super(view);
        this.valueText = new TextBlock('', view.valueText);
    }

    getValue() {
        return this.value;
    }

    setValue(value: string) {
        this.value = value;
        this.valueText.setText(value);
    }

    syncValueTitleWithText(format?: (text: string) => string) {
        this.valueText.syncTitleWithText(format);
    }
}