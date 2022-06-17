import { BaseFormView } from "./BaseFormView";
import { ComplexFieldFormGroupView } from "./ComplexFieldFormGroupView";

export class ComplexFieldLayout {
    constructor(
        private readonly complexField: ComplexFieldFormGroupView | BaseFormView
    ) {
    }

    execute() {
        this.executeLayout(this.complexField);
    }

    protected executeLayout(complexField: ComplexFieldFormGroupView | BaseFormView) {
        if (complexField instanceof BaseFormView) {
            complexField.forEachFormGroup(fg => {
                fg.addToContainer(complexField);
            });
        }
        else {
            complexField.forEachFormGroup(fg => {
                fg.addToContainer(complexField.valueColumn);
            });
        }
    }
}