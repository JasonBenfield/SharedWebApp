import { Awaitable } from "../Awaitable";
import { SingleActivePanel } from "../Panel/SingleActivePanel";
import { AbsoluteDateRangePanel } from "./AbsoluteDateRangePanel";
import { AbsoluteNumberRangePanel } from "./AbsoluteNumberRangePanel";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterSelection, FilterSelectionAbsoluteDateRange, FilterSelectionAbsoluteNumberRange, FilterSelectionRelativeDateRange } from "./FilterSelection";
import { FilterValueInputPanel } from "./FilterValueInputPanel";
import { FilterWorkflowView } from "./FilterWorkflowView";
import { ODataColumn } from "./ODataColumn";
import { ODataQueryFilterBuilder } from "./ODataQueryFilterBuilder";
import { RelativeDateRangePanel } from "./RelativeDateRangePanel";
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
    private readonly relativeDateRangePanel: RelativeDateRangePanel;
    private readonly absoluteDateRangePanel: AbsoluteDateRangePanel;
    private readonly absoluteNumberRangePanel: AbsoluteNumberRangePanel;
    private options: FilterColumnOptionsBuilder;

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
        this.relativeDateRangePanel = this.panels.add(
            new RelativeDateRangePanel(view.relativeDateRangePanel)
        );
        this.absoluteDateRangePanel = this.panels.add(
            new AbsoluteDateRangePanel(view.absoluteDateRangePanel)
        );
        this.absoluteNumberRangePanel = this.panels.add(
            new AbsoluteNumberRangePanel(view.absoluteNumberRangePanel)
        );
    }

    private async activateSelectFilterAppendPanel() {
        this.panels.activate(this.selectFilterAppendPanel);
        const result = await this.selectFilterAppendPanel.start();
        if (result.next) {
            this.activateSelectFilterConditionPanel();
        }
        else if (result.done) {
            this.awaitable.resolve(Result.done());
        }
    }

    private async activateSelectFilterConditionPanel() {
        this.panels.activate(this.selectFilterConditionPanel);
        const result = await this.selectFilterConditionPanel.start();
        if (result.next) {
            const selection = this.options.getSelection();
            if (selection instanceof FilterSelectionRelativeDateRange) {
                this.activateRelativeDateRangePanel();
            }
            else if (selection instanceof FilterSelectionAbsoluteDateRange) {
                this.activateAbsoluteDateRangePanel();
            }
            else if (selection instanceof FilterSelectionAbsoluteNumberRange) {
                this.activateAbsoluteNumberRangePanel();
            }
            else {
                this.activateFilterValueInputPanel();
            }
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

    private async activateRelativeDateRangePanel() {
        this.panels.activate(this.relativeDateRangePanel);
        const result = await this.relativeDateRangePanel.start();
        if (result.done) {
            this.awaitable.resolve(Result.done());
        }
    }

    private async activateAbsoluteDateRangePanel() {
        this.panels.activate(this.absoluteDateRangePanel);
        const result = await this.absoluteDateRangePanel.start();
        if (result.done) {
            this.awaitable.resolve(Result.done());
        }
    }

    private async activateAbsoluteNumberRangePanel() {
        this.panels.activate(this.absoluteNumberRangePanel);
        const result = await this.absoluteNumberRangePanel.start();
        if (result.done) {
            this.awaitable.resolve(Result.done());
        }
    }

    setColumn(column: ODataColumn) {
        this.options = new FilterColumnOptionsBuilder(this.filter, column);
        this.selectFilterAppendPanel.setOptions(this.options);
        this.selectFilterConditionPanel.setOptions(this.options);
        this.filterValueInputPanel.setOptions(this.options);
        this.relativeDateRangePanel.setOptions(this.options);
        this.absoluteDateRangePanel.setOptions(this.options);
        this.absoluteNumberRangePanel.setOptions(this.options);
    }

    start() { return this.awaitable.start(); }

    activate() {
        if (this.filter.any()) {
            this.activateSelectFilterAppendPanel();
        }
        else {
            this.activateSelectFilterConditionPanel();
        }
    }

    deactivate() { this.view.hide(); }
}