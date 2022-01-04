import { Block } from "./Block";
import { BlockViewModel } from "./BlockViewModel";
import { Input } from "./Input";
import { InputViewModel } from "./InputViewModel";

export class InputGroup extends Block {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('input-group');
    }

    addInput(vm: InputViewModel = new InputViewModel()) {
        return this.addContent(new Input(vm));
    }
}