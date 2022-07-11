import { ModalComponentView } from "../Views/Modal";
import { ValueRangePanelView } from "./ValueRangePanelView";
import { FilterValueInputPanelView } from "./FilterValueInputPanelView";
import { RelativeDateRangePanelView } from "./RelativeDateRangePanelView";
import { SelectFilterAppendPanelView } from "./SelectFilterAppendPanelView";
import { SelectFilterConditionPanelView } from "./SelectFilterConditionPanelView";

export class FilterWorkflowView {
    readonly selectFilterAppendPanel: SelectFilterAppendPanelView;
    readonly selectFilterConditionPanel: SelectFilterConditionPanelView;
    readonly filterValueInputPanel: FilterValueInputPanelView;
    readonly relativeDateRangePanel: RelativeDateRangePanelView;
    readonly absoluteDateRangePanel: ValueRangePanelView;
    readonly absoluteNumberRangePanel: ValueRangePanelView;

    constructor(modal: ModalComponentView) {
        this.selectFilterAppendPanel = new SelectFilterAppendPanelView(modal);
        this.selectFilterConditionPanel = new SelectFilterConditionPanelView(modal);
        this.filterValueInputPanel = new FilterValueInputPanelView(modal);
        this.relativeDateRangePanel = new RelativeDateRangePanelView(modal);
        this.absoluteDateRangePanel = new ValueRangePanelView(modal);
        this.absoluteNumberRangePanel = new ValueRangePanelView(modal);
    }

    setViewID(id: string) {
        this.relativeDateRangePanel.setViewID(`${id}RelativeDateRangePanel`);
        this.absoluteDateRangePanel.setViewID(`${id}AbsoluteDateRangePanel`);
        this.absoluteNumberRangePanel.setViewID(`${id}AbsoluteNumberRangePanel`);
    }

    hide() {
        this.selectFilterAppendPanel.hide();
        this.selectFilterConditionPanel.hide();
        this.filterValueInputPanel.hide();
        this.relativeDateRangePanel.hide();
        this.absoluteDateRangePanel.hide();
        this.absoluteNumberRangePanel.hide();
    }
}