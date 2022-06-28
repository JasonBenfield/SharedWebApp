import { Awaitable } from "../Awaitable";
import { TextComponent } from "../Components/TextComponent";
import { TextLink } from "../Components/TextLink";
import { TextLinkView } from "../Views/TextLinkView";
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
        new TextLink(view.appendItem).setText('Append to Filter');
        new TextLink(view.clearItem).setText('Replace Filter');
        this.view.handleClick(this.onItemClick.bind(this));
    }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        new TextComponent(this.view.title).setText(`${options.column.columnName} Filter`);
    }

    private onItemClick(itemView: TextLinkView) {
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