import { Awaitable } from "../Awaitable";
import { Command } from "../Components/Command";
import { DelayedAction } from "../DelayedAction";
import { RelativeDateRange } from "../RelativeDateRange";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterSelectionRelativeDateRangeValue } from "./FilterSelectionRelativeDateRangeValue";
import { RelativeDateRangePanelView } from "./RelativeDateRangePanelView";

interface IResult {
    readonly done?: {};
}

class Result {
    static done() { return new Result({ done: {} }); }

    private constructor(private readonly result: IResult) { }

    get done() { return this.result.done; }
}

export class RelativeDateRangePanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private options: FilterColumnOptionsBuilder;

    constructor(private readonly view: RelativeDateRangePanelView) {
        new Command(this.cancel.bind(this)).add(view.cancelButton);
        new Command(this.save.bind(this)).add(view.saveButton);
    }

    private cancel() { this.awaitable.resolve(Result.done()); }

    private save() {
        const relativeDateRange = this.getRelativeDateRange();
        this.options.setRelativeDateRangeValue(relativeDateRange);
        this.options.applyToQuery();
        this.awaitable.resolve(Result.done());
    }

    private getRelativeDateRange() {
        return new RelativeDateRange(null, null);
    }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
    }

    start() {
        new DelayedAction(
            () => {
            },
            700
        ).execute();
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}