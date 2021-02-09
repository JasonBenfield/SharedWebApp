import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";

export class CardBody extends Block {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.vm.css('card-body');
    }
}