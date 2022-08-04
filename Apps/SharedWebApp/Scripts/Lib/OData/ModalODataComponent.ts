import { Awaitable } from "../Awaitable";
import { EventBuilders, EventSource } from "../Events";
import { SingleActivePanel } from "../Panel/SingleActivePanel";
import { FilterWorkflow } from "./FilterWorkflow";
import { ModalODataComponentView } from "./ModalODataComponentView";
import { ODataColumn } from "./ODataColumn";
import { ODataColumnAccessor } from "./ODataColumnAccessor";
import { ODataQueryBuilder } from "./ODataQueryBuilder";
import { SelectFieldsPanel } from "./SelectFieldsPanel";

interface IResult {
    done?: {};
}

class Result {
    static done() { return new Result({ done: {} }); }

    private constructor(private readonly result: IResult) { }

    get done() { return this.result.done; }
}

export class ModalODataComponent {
    private readonly awaitable = new Awaitable<Result>();
    private readonly panels = new SingleActivePanel();
    readonly selectFieldsPanel: SelectFieldsPanel;
    readonly filterWorkflow: FilterWorkflow;

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
    }

    private async activateSelectFieldsPanel() {
        this.panels.activate(this.selectFieldsPanel);
        const result = await this.selectFieldsPanel.start();
        if (result.done) {
            this.hide();
            this.awaitable.resolve(Result.done());
        }
    }

    showSelect() {
        this.view.showModal();
        this.activateSelectFieldsPanel();
        return this.awaitable.start();
    }

    showFilter(column: ODataColumn) {
        this.view.showModal();
        this.filterWorkflow.setColumn(column);
        this.activateFilterWorkflow();
        return this.awaitable.start();
    }

    private async activateFilterWorkflow() {
        this.panels.activate(this.filterWorkflow);
        const result = await this.filterWorkflow.start();
        if (result.done) {
            this.hide();
            this.awaitable.resolve(Result.done());
        }
    }

    private hide() { this.view.hideModal(); }
}