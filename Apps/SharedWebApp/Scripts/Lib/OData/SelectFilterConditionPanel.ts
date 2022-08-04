import { Awaitable } from "../Awaitable";
import { BasicComponent } from "../Components/BasicComponent";
import { Command } from "../Components/Command";
import { ListGroup } from "../Components/ListGroup";
import { TextComponent } from "../Components/TextComponent";
import { TextButtonListGroupItemView } from "../Views/ListGroup";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterSelection } from "./FilterSelection";
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

export class SelectFilterConditionPanel extends BasicComponent implements IPanel {
    private readonly panelView: SelectFilterConditionPanelView;
    private readonly awaitable = new Awaitable<Result>();
    private options: FilterColumnOptionsBuilder;
    private readonly conditionListGroup: ListGroup;

    constructor(view: SelectFilterConditionPanelView) {
        super(view.body);
        this.panelView = view;
        this.conditionListGroup = new ListGroup(view.conditions);
        this.conditionListGroup.registerItemClicked(this.onItemClick.bind(this));
        new Command(this.back.bind(this)).add(view.backButton);
    }

    private back() { this.awaitable.resolve(Result.done()); }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        const conditions = options.getPotentialConditions(options.column.sourceType);
        new TextComponent(this.panelView.title).setText(`${options.column.displayText} Filter`);
        this.conditionListGroup.setItems(
            conditions,
            (condition, itemView: TextButtonListGroupItemView) => {
                const item = new TextComponent(itemView);
                item.data = condition;
                item.setText(condition.displayText);
                return item;
            }
        );
    }

    private onItemClick(item: TextComponent) {
        const condition = item.data as FilterSelection;
        this.options.setFilterSelection(condition);
        if (this.options.hasAppliedToQuery) {
            this.awaitable.resolve(Result.done());
        }
        else {
            this.awaitable.resolve(Result.next());
        }
    }

    start() { return this.awaitable.start(); }

    activate() { this.panelView.show(); }

    deactivate() { this.panelView.hide(); }
}