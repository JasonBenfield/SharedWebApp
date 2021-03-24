import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";

export class CardHeader extends Block {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.vm.css('card-header');
    }
}