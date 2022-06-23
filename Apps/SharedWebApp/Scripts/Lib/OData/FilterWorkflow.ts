import { Awaitable } from "../Awaitable";
import { SingleActivePanel } from "../Panel/SingleActivePanel";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterValueInputPanel } from "./FilterValueInputPanel";
import { FilterWorkflowView } from "./FilterWorkflowView";
import { ODataColumn } from "./ODataColumn";
import { ODataQueryFilterBuilder } from "./ODataQueryFilterBuilder";
import { SelectFilterAppendPanel } from "./SelectFilterAppendPanel";
import { SelectFilterConditionPanel } from "./SelectFilterConditionPanel";

interface IResult {
    readonly done: {};
}

class Result {
    static done() { return new Result({ done: {} }); }

    private constructor(private readonly result: IResult) { }

    get done() { return this.result.done; }
}

export class FilterWorkflow implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly panels = new SingleActivePanel();
    private readonly selectFilterAppendPanel: SelectFilterAppendPanel;
    private readonly selectFilterConditionPanel: SelectFilterConditionPanel;
    private readonly filterValueInputPanel: FilterValueInputPanel;

    constructor(
        private readonly filter: ODataQueryFilterBuilder,
        private readonly view: FilterWorkflowView
    ) {
        this.selectFilterAppendPanel = this.panels.add(
            new SelectFilterAppendPanel(view.selectFilterAppendPanel)
        );
        this.selectFilterConditionPanel = this.panels.add(
            new SelectFilterConditionPanel(view.selectFilterConditionPanel)
        );
        this.filterValueInputPanel = this.panels.add(
            new FilterValueInputPanel(view.filterValueInputPanel)
        );
    }

    private async activateSelectFilterAppendPanel() {
        this.panels.activate(this.selectFilterAppendPanel);
        const result = await this.selectFilterAppendPanel.start();
        if (result.next) {
            this.activateSelectFilterConditionPanel();
        }
    }

    private async activateSelectFilterConditionPanel() {
        this.panels.activate(this.selectFilterConditionPanel);
        const result = await this.selectFilterConditionPanel.start();
        if (result.next) {
            this.activateFilterValueInputPanel();
        }
        else if (result.done) {
            this.awaitable.resolve(Result.done());
        }
    }

    private async activateFilterValueInputPanel() {
        this.panels.activate(this.filterValueInputPanel);
        const result = await this.filterValueInputPanel.start();
        if (result.done) {
            this.awaitable.resolve(Result.done());
        }
    }

    setColumn(column: ODataColumn) {
        const options = new FilterColumnOptionsBuilder(this.filter, column);
        this.selectFilterAppendPanel.setOptions(options);
        this.selectFilterConditionPanel.setOptions(options);
    }

    start() { return this.awaitable.start(); }

    activate() {
        this.activateSelectFilterAppendPanel();
        this.view.show();
    }

    deactivate() { this.view.hide(); }
}