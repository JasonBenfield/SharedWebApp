import { Awaitable } from "../Awaitable";
import { BasicComponent } from "../Components/BasicComponent";
import { Command } from "../Components/Command";
import { TextComponent } from "../Components/TextComponent";
import { DelayedAction } from "../DelayedAction";
import { RelativeDateRange } from "../RelativeDateRange";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { RelativeDateRangePanelView } from "./RelativeDateRangePanelView";
import { RelativeDateRangePicker } from "./RelativeDateRangePicker";

interface IResult {
    readonly done?: {};
}

class Result {
    static done() { return new Result({ done: {} }); }

    private constructor(private readonly result: IResult) { }

    get done() { return this.result.done; }
}

export class RelativeDateRangePanel extends BasicComponent implements IPanel {
    private readonly panelView: RelativeDateRangePanelView;
    private readonly awaitable = new Awaitable<Result>();
    private options: FilterColumnOptionsBuilder;
    private readonly columnName: TextComponent;
    private readonly relativeDateRangePicker: RelativeDateRangePicker;
    private readonly preview: TextComponent;

    constructor(view: RelativeDateRangePanelView) {
        super(view.body);
        this.panelView = view;
        this.columnName = new TextComponent(view.columnName);
        this.relativeDateRangePicker = this.addComponent(new RelativeDateRangePicker(view.relativeDateRangePicker));
        this.relativeDateRangePicker.when.valueChanged.then(this.onRelativeDateRangeChanged.bind(this));
        this.preview = new TextComponent(view.preview);
        new Command(this.cancel.bind(this)).add(view.cancelButton);
        new Command(this.save.bind(this)).add(view.saveButton);
    }

    private onRelativeDateRangeChanged(relativeDateRange: RelativeDateRange) {
        this.preview.setText(relativeDateRange.toDateRange().format());
    }

    private cancel() { this.awaitable.resolve(Result.done()); }

    private save() {
        const relativeDateRange = this.getRelativeDateRange();
        this.options.setRelativeDateRangeValue(relativeDateRange);
        this.awaitable.resolve(Result.done());
    }

    private getRelativeDateRange() {
        return this.relativeDateRangePicker.getValue();
    }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        this.columnName.setText(options.column.displayText);
        this.relativeDateRangePicker.setValue(
            new RelativeDateRange(
                null,
                null,
                true
            )
        );
        this.preview.setText(this.relativeDateRangePicker.getValue().toDateRange().format());
    }

    start() {
        this.relativeDateRangePicker.setFocus();
        return this.awaitable.start();
    }

    activate() { this.panelView.show(); }

    deactivate() { this.panelView.hide(); }
}