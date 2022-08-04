import { Awaitable } from "../Awaitable";
import { BasicComponent } from "../Components/BasicComponent";
import { Command } from "../Components/Command";
import { TextComponent } from "../Components/TextComponent";
import { TextLinkComponent } from "../Components/TextLinkComponent";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterConditionClauseComponent } from "./FilterConditionClauseComponent";
import { FilterConditionClause } from "./ODataQueryFilterBuilder";
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

export class SelectFilterAppendPanel extends BasicComponent implements IPanel {
    private readonly panelView: SelectFilterAppendPanelView;
    private readonly awaitable = new Awaitable<Result>();
    private options: FilterColumnOptionsBuilder;
    private readonly conditionComponents: BasicComponent[] = [];

    constructor(view: SelectFilterAppendPanelView) {
        super(view.body);
        this.panelView = view;
        new TextLinkComponent(view.appendItem).setText('Append to Filter');
        new TextLinkComponent(view.clearItem).setText('Replace Filter');
        view.handleLinkClick(this.onItemClick.bind(this));
        new Command(this.back.bind(this)).add(view.backButton);
    }

    private back() { this.awaitable.resolve(Result.done()); }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        new TextComponent(this.panelView.title).setText(`${options.column.displayText} Filter`);
        this.updateConditions();
    }

    private updateConditions() {
        for (const component of this.conditionComponents) {
            this.removeComponent(component);
        }
        this.conditionComponents.splice(0, this.conditionComponents.length);
        const conditionClauses = this.options.getConditionClauses();
        if (conditionClauses.length > 0) {
            this.panelView.showConditions();
        }
        else {
            this.panelView.hideConditions();
        }
        for (const conditionClause of conditionClauses) {
            const conditionClauseComponent = this.addComponent(
                new FilterConditionClauseComponent(this.panelView.addCondition())
            );
            conditionClauseComponent.setConditionClause(conditionClause);
            conditionClauseComponent.when.deleteClicked.then(this.onDeleteClick.bind(this));
            this.conditionComponents.push(conditionClauseComponent);
        }
    }

    private onItemClick(sourceElement: HTMLElement) {
        if (this.panelView.clearItem.hasElement(sourceElement)) {
            this.options.replace();
        }
        else if (this.panelView.appendItem.hasElement(sourceElement)) {
            this.options.append();
        }
        this.awaitable.resolve(Result.next());
    }

    private onDeleteClick(conditionClause: FilterConditionClause) {
        this.options.deleteConditionClause(conditionClause);
        this.updateConditions();
    }

    start() {
        return this.awaitable.start();
    }

    activate() { this.panelView.show(); }

    deactivate() { this.panelView.hide(); }
}