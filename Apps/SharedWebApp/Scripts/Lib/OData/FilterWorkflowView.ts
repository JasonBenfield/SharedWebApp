import { Block } from "../Html/Block";
import { FilterValueInputPanelView } from "./FilterValueInputPanelView";
import { SelectFilterAppendPanelView } from "./SelectFilterAppendPanelView";
import { SelectFilterConditionPanelView } from "./SelectFilterConditionPanelView";

export class FilterWorkflowView extends Block {
    readonly selectFilterAppendPanel: SelectFilterAppendPanelView;
    readonly selectFilterConditionPanel: SelectFilterConditionPanelView;
    readonly filterValueInputPanel: FilterValueInputPanelView;

    constructor() {
        super();
        this.addCssName('d-contents');
        this.selectFilterAppendPanel = this.addContent(new SelectFilterAppendPanelView());
        this.selectFilterConditionPanel = this.addContent(new SelectFilterConditionPanelView());
        this.filterValueInputPanel = this.addContent(new FilterValueInputPanelView());
    }
}