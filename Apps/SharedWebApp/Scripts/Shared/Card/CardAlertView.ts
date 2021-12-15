import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { MessageAlertView } from "../MessageAlertView";

export class CardAlertView extends Block {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('card-body');
        this.hide();
    }

    readonly alert = this.addContent(new MessageAlertView());
}