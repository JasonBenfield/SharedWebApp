import { SingleActivePanel } from "../Panel/SingleActivePanel";
import { FilterWorkflow } from "./FilterWorkflow";
import { ModalODataComponentView } from "./ModalODataComponentView";
import { ODataColumn } from "./ODataColumn";
import { ODataColumnAccessor } from "./ODataColumnAccessor";
import { ODataQueryBuilder } from "./ODataQueryBuilder";
import { SelectFieldsPanel } from "./SelectFieldsPanel";

export class ModalODataComponent {
    private readonly panels = new SingleActivePanel();
    readonly selectFieldsPanel: SelectFieldsPanel;
    readonly filterWorkflow: FilterWorkflow;

    readonly closed: IEventHandler<any>;

    constructor(
        query: ODataQueryBuilder,
        columns: ODataColumnAccessor,
        private readonly view: ModalODataComponentView
    ) {
        this.selectFieldsPanel = this.panels.add(
            new SelectFieldsPanel(query.select, columns, view.selectFieldsPanel)
        );
        this.filterWorkflow = this.panels.add(
            new FilterWorkflow(query.filter, view.filterWorkflow)
        );
        this.closed = view.closed;
    }

    private async activateSelectFieldsPanel() {
        this.panels.activate(this.selectFieldsPanel);
        const result = await this.selectFieldsPanel.start();
        if (result.done) {
            this.hide();
        }
    }

    showSelect() {
        this.view.showModal();
        this.activateSelectFieldsPanel();
    }

    showFilter(column: ODataColumn) {
        this.view.showModal();
        this.filterWorkflow.setColumn(column);
        this.activateFilterWorkflow();
    }

    private async activateFilterWorkflow() {
        this.panels.activate(this.filterWorkflow);
        const result = await this.filterWorkflow.start();
        if (result.done) {
            this.hide();
        }
    }

    hide() { this.view.hideModal(); }
}