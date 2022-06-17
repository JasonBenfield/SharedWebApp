import { BlockViewModel } from "./BlockViewModel";
import { FormGroupView } from "./FormGroupView";

export class PlainTextFormGroupView extends FormGroupView {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.valueColumn.addCssName('form-control-plaintext');
    }
}