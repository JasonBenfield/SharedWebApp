import { BasicComponentView } from "../Views/BasicComponentView";
import { ModalComponentView } from "../Views/Modal";
import { FilterWorkflowView } from "./FilterWorkflowView";
import { SelectFieldsPanelView } from "./SelectFieldsPanelView";

export class ModalODataComponentView extends ModalComponentView {
    readonly selectFieldsPanel: SelectFieldsPanelView;
    readonly filterWorkflow: FilterWorkflowView;

    constructor(container: BasicComponentView) {
        super(container);
        this.frame.addCssName('modal-dialog-scrollable');
        this.frame.addCssName('modal-odata');
        this.selectFieldsPanel = new SelectFieldsPanelView(this);
        this.filterWorkflow = new FilterWorkflowView(this);
    }

    setViewID(id: string) {
        this.filterWorkflow.setViewID(`${id}FilterWorkflow`);
    }
}