import { Awaitable } from "../Awaitable";
import { Command } from "../Components/Command";
import { TextComponent } from "../Components/TextComponent";
import { TextLink } from "../Components/TextLink";
import { TextLinkView } from "../Views/TextLinkView";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { SelectFilterAppendPanelView } from "./SelectFilterAppendPanelView";

interface IResult {
    readonly done?: {};
    readonly next?: {};
}

class Result {
    static done() { return new Result({ done: {} }); }

    static next() { return new Result({ next: {} }); }

    private constructor(private readonly result: IResult) { }

    get next() { return this.result.next; }

    get done() { return this.result.done; }
}

export class SelectFilterAppendPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private options: FilterColumnOptionsBuilder;

    constructor(private readonly view: SelectFilterAppendPanelView) {
        new TextLink(view.appendItem).setText('Append to Filter');
        new TextLink(view.clearItem).setText('Replace Filter');
        this.view.handleClick(this.onItemClick.bind(this));
        new Command(this.back.bind(this)).add(view.backButton);
    }

    private back() { this.awaitable.resolve(Result.done()); }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        new TextComponent(this.view.title).setText(`${options.column.columnName} Filter`);
        this.view.clearConditions();
        const conditionQueries = options.getConditionQueries();
        for (const conditionQuery of conditionQueries) {
            const conditionView = this.view.addCondition();
            new TextComponent(conditionView).setText(conditionQuery);
        }
        if (conditionQueries.length > 0) {
            this.view.showConditions();
        }
        else {
            this.view.hideConditions();
        }
    }

    private onItemClick(itemView: TextLinkView, sourceElement: HTMLElement) {
        if (this.view.clearItem.hasElement(sourceElement)) {
            this.options.replace();
        }
        else if (this.view.appendItem.hasElement(sourceElement)) {
            this.options.append();
        }
        this.awaitable.resolve(Result.next());
    }

    start() { return this.awaitable.start(); }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}