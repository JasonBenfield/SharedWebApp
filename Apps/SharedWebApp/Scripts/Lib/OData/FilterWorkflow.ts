import { Awaitable } from "../Awaitable";
import { SingleActivePanel } from "../Panel/SingleActivePanel";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterWorkflowView } from "./FilterWorkflowView";
import { ODataColumn } from "./ODataColumn";
import { SelectFilterAppendPanel } from "./SelectFilterAppendPanel";

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
    private options: FilterColumnOptionsBuilder;

    constructor(private readonly view: FilterWorkflowView) {
        this.selectFilterAppendPanel = this.panels.add(
            new SelectFilterAppendPanel(view.selectFilterAppendPanel)
        );
    }

    private async activateSelectFilterAppendPanel() {
        this.panels.activate(this.selectFilterAppendPanel);
        const result = await this.selectFilterAppendPanel.start();
        if (result.done) {

        }
    }

    setColumn(column: ODataColumn) {
        this.options = new FilterColumnOptionsBuilder(column);
    }

    start() { return this.awaitable.start(); }

    activate() {
        this.selectFilterAppendPanel.setOptions(this.options);
        this.activateSelectFilterAppendPanel();
        this.view.show();
    }

    deactivate() { this.view.hide(); }
}