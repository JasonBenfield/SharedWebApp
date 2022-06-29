import { Awaitable } from "../Awaitable";
import { BasicComponent } from "../Components/BasicComponent";
import { Command } from "../Components/Command";
import { TextComponent } from "../Components/TextComponent";
import { TextLinkView } from "../Views/TextLinkView";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterConditionLink } from "./FilterConditionLink";
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

    constructor(view: SelectFilterConditionPanelView) {
        super(view.body);
        this.panelView = view;
        for (const selection of FilterSelection.all) {
            this.addComponent(new FilterConditionLink(selection, view.addLink()));
        }
        view.handleClick(this.onItemClick.bind(this));
        new Command(this.back.bind(this)).add(view.backButton);
    }

    private back() { this.awaitable.resolve(Result.done()); }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        new TextComponent(this.panelView.title).setText(`${options.column.columnName} Filter`);
        for (const component of this.getComponents()) {
            const link = component as FilterConditionLink;
            link.sourceTypeChanged(options.column.sourceType);
        }
    }

    private onItemClick(itemView: TextLinkView, sourceElement: HTMLElement) {
        const link = this.getComponentByElement(sourceElement) as FilterConditionLink;
        if (link) {
            this.options.setFilterSelection(link.selection);
            if (
                link.selection === FilterSelection.isTrue ||
                link.selection === FilterSelection.isFalse ||
                link.selection === FilterSelection.isBlank ||
                link.selection === FilterSelection.isNotBlank
            ) {
                this.options.applyToQuery();
                this.awaitable.resolve(Result.done());
            }
            else {
                this.awaitable.resolve(Result.next());
            }
        }
    }

    start() { return this.awaitable.start(); }

    activate() { this.panelView.show(); }

    deactivate() { this.panelView.hide(); }
}