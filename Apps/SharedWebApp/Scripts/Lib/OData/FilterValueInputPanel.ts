import { Awaitable } from "../Awaitable";
import { TextBlock } from "../Html/TextBlock";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterValueInputPanelView } from "./FilterValueInputPanelView";

interface IResult {
    readonly done?: {};
}

class Result {
    static done() { return new Result({ done: {} }); }

    private constructor(private readonly result: IResult) { }

    get done() { return this.result.done; }
}

export class FilterValueInputPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private options: FilterColumnOptionsBuilder;

    constructor(private readonly view: FilterValueInputPanelView) {
    }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        new TextBlock(`Filter ${options.column.columnName}`, this.view.title);
    }

    start() {
        return this.awaitable.start();
    }

    activate() {
        this.view.show();
    }

    deactivate() { this.view.hide(); }
}