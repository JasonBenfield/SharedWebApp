import { Awaitable } from "../Awaitable";
import { Command } from "../Components/Command";
import { TextComponent } from "../Components/TextComponent";
import { TextLink } from "../Components/TextLink";
import { TextLinkView } from "../Views/TextLinkView";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterConditionClause, FilterConjunction } from "./ODataQueryFilterBuilder";
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
        new TextComponent(this.view.title).setText(`${options.column.displayText} Filter`);
        this.updateConditions();
    }

    private updateConditions() {
        this.view.clearConditions();
        const conditionClauses = this.options.getConditionClauses();
        for (const conditionClause of conditionClauses) {
            const conditionView = this.view.addCondition();
            new TextComponent(conditionView).setText(conditionClause.condition.format());
            const deleteButton = this.view.addDeleteButton();
            deleteButton.handleClick(this.onDeleteClick.bind(this, conditionClause));
            const conjunctionView = this.view.addConjunction();
            new TextComponent(conjunctionView).setText(conditionClause.conjunction.format());
        }
        if (conditionClauses.length > 0) {
            this.view.showConditions();
        }
        else {
            this.view.hideConditions();
        }
    }

    private onDeleteClick(conditionClause: FilterConditionClause) {
        this.options.deleteConditionClause(conditionClause);
        this.updateConditions();
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