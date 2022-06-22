import { Block } from "../Html/Block";
import { SelectFilterAppendPanelView } from "./SelectFilterAppendPanelView";

export class FilterWorkflowView extends Block {
    readonly selectFilterAppendPanel: SelectFilterAppendPanelView;

    constructor() {
        super();
        this.addCssName('d-contents');
        this.selectFilterAppendPanel = this.addContent(new SelectFilterAppendPanelView());
    }
}