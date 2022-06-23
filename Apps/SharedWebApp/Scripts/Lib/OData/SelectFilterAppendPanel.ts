import { Awaitable } from "../Awaitable";
import { NavLinkView } from "../Html/NavLinkView";
import { TextBlock } from "../Html/TextBlock";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { SelectFilterAppendPanelView } from "./SelectFilterAppendPanelView";

interface IResult {
    readonly next?: {};
}

class Result {
    static next() { return new Result({ next: {} }); }

    private constructor(private readonly result: IResult) { }

    get next() { return this.result.next; }
}

export class SelectFilterAppendPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private options: FilterColumnOptionsBuilder;

    constructor(private readonly view: SelectFilterAppendPanelView) {
        this.view.events.onClick(
            this.onItemClick.bind(this),
            o => o.selector = 'a'
        );
    }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        new TextBlock(`${options.column.columnName} Filter`, this.view.title);
    }

    private onItemClick(itemView: NavLinkView) {
        if (itemView === this.view.clearItem) {
            this.options.replace();
        }
        else if (itemView === this.view.appendItem) {
            this.options.append();
        }
        this.awaitable.resolve(Result.next());
    }

    start() { return this.awaitable.start(); }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}