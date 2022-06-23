import { Awaitable } from "../Awaitable";
import { FilteredArray } from "../Enumerable";
import { TextBlock } from "../Html/TextBlock";
import { TextNavLinkView } from "../Html/TextNavLinkView";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterConditionLink } from "./FilterConditionLink";
import { FilterSelection } from "./FilterSelection";
import { FilterSelectionBooleanValue } from "./FilterSelectionBooleanValue";
import { ODataQueryFilterBuilder } from "./ODataQueryFilterBuilder";
import { SelectFilterConditionPanelView } from "./SelectFilterConditionPanelView";

interface IResult {
    readonly next?: {};
    readonly done?: {};
}

class Result {
    static next() { return new Result({ next: {} }); }

    static done() { return new Result({ done: {} }); }

    private constructor(private readonly result: IResult) { }

    get next() { return this.result.next; }

    get done() { return this.result.done; }
}

export class SelectFilterConditionPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly links: FilterConditionLink[] = [];
    private options: FilterColumnOptionsBuilder;

    constructor(private readonly view: SelectFilterConditionPanelView) {
        for (const selection of FilterSelection.all) {
            this.links.push(new FilterConditionLink(selection, view.addLink()));
        }
        this.view.events.onClick(
            this.onItemClick.bind(this),
            o => o.selector = 'a'
        );
    }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        new TextBlock(`${options.column.columnName} Filter`, this.view.title);
        for (const link of this.links) {
            link.sourceTypeChanged(options.column.sourceType);
        }
    }

    private onItemClick(itemView: TextNavLinkView) {
        const link = new FilteredArray(
            this.links,
            l => l.hasView(itemView)
        ).value()[0];
        if (link) {
            this.options.setFilterSelection(link.selection);
            if (link.selection === FilterSelection.isTrue || link.selection === FilterSelection.isFalse) {
                this.options.applyToQuery();
                this.awaitable.resolve(Result.done());
            }
            else {
                this.awaitable.resolve(Result.next());
            }
        }
    }

    start() { return this.awaitable.start(); }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}