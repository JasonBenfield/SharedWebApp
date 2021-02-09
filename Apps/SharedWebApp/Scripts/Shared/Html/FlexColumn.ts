import { Block } from "./Block";
import { BlockViewModel } from "./BlockViewModel";

export class FlexColumn extends Block {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('d-flex flex-column h-100');
    }
}