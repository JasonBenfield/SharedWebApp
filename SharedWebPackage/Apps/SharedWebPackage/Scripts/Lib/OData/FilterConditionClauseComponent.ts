import { BasicComponent } from "../Components/BasicComponent";
import { AsyncCommand, Command } from "../Components/Command";
import { TextComponent } from "../Components/TextComponent";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterConditionClauseView } from "./FilterConditionClauseView";
import { FilterConditionClause } from "./ODataQueryFilterBuilder";
import { EventSource } from '../Events';

export type Events = { deleteClicked: FilterConditionClause }

export class FilterConditionClauseComponent extends BasicComponent {
    protected readonly view: FilterConditionClauseView;
    private readonly condition: TextComponent;
    private conditionClause: FilterConditionClause;
    private readonly deleteCommand: Command;
    private readonly conjunction: TextComponent;

    private readonly eventSource = new EventSource<Events>(this, { deleteClicked: null as FilterConditionClause });
    readonly when = this.eventSource.when;

    constructor(view: FilterConditionClauseView) {
        super(view);
        this.condition = this.addComponent(new TextComponent(view.condition));
        this.deleteCommand = this.addComponent(new Command(this.deleteCondition.bind(this)));
        this.deleteCommand.add(view.deleteButton);
        this.conjunction = this.addComponent(new TextComponent(view.conjunction));
    }

    setConditionClause(conditionClause: FilterConditionClause) {
        this.conditionClause = conditionClause;
        this.condition.setText(conditionClause.condition.format());
        this.conjunction.setText(conditionClause.conjunction.format());
    }

    private deleteCondition() {
        this.eventSource.events.deleteClicked.invoke(this.conditionClause);
    }

    protected onDispose() {
        this.eventSource.unregisterAll();
    }
}