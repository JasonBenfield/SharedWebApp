import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { MessageAlertView } from "../MessageAlertView";
export declare class CardAlertView extends Block {
    constructor(vm?: BlockViewModel);
    readonly alert: MessageAlertView;
}
