import { BlockViewModel } from "../Html/BlockViewModel";
import { Input } from "../Html/Input";
import { SimpleFieldFormGroupView } from "./SimpleFieldFormGroupView";

export class InputFormGroupView extends SimpleFieldFormGroupView {
    readonly input: Input;

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.input = this.inputGroup.insertContent(0, new Input());
        this.input.addCssName('form-control');
    }
}