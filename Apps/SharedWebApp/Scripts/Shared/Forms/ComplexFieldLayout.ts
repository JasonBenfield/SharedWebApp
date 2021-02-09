import { BaseForm } from "./BaseForm";
import { ComplexFieldFormGroup } from "./ComplexFieldFormGroup";

export class ComplexFieldLayout {
    constructor(
        private readonly complexField: ComplexFieldFormGroup | BaseForm
    ) {
    }

    execute() {
        this.executeLayout(this.complexField);
    }

    protected executeLayout(complexField: ComplexFieldFormGroup | BaseForm) {
        if (complexField instanceof BaseForm) {
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