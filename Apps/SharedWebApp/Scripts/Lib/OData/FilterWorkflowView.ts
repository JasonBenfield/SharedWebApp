import { ModalComponentView } from "../Views/Modal";
import { FilterValueInputPanelView } from "./FilterValueInputPanelView";
import { RelativeDateRangePanelView } from "./RelativeDateRangePanelView";
import { SelectFilterAppendPanelView } from "./SelectFilterAppendPanelView";
import { SelectFilterConditionPanelView } from "./SelectFilterConditionPanelView";

export class FilterWorkflowView {
    readonly selectFilterAppendPanel: SelectFilterAppendPanelView;
    readonly selectFilterConditionPanel: SelectFilterConditionPanelView;
    readonly filterValueInputPanel: FilterValueInputPanelView;
    readonly relativeDateRangePanel: RelativeDateRangePanelView;

    constructor(modal: ModalComponentView) {
        this.selectFilterAppendPanel = new SelectFilterAppendPanelView(modal);
        this.selectFilterConditionPanel = new SelectFilterConditionPanelView(modal);
        this.filterValueInputPanel = new FilterValueInputPanelView(modal);
        this.relativeDateRangePanel = new RelativeDateRangePanelView(modal);
    }

    hide() {
        this.selectFilterAppendPanel.hide();
        this.selectFilterConditionPanel.hide();
        this.filterValueInputPanel.hide();
        this.relativeDateRangePanel.hide();
    }
}