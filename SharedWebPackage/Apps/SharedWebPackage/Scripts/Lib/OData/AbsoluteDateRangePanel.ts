import { Awaitable } from "../Awaitable";
import { BasicComponent } from "../Components/BasicComponent";
import { Command } from "../Components/Command";
import { TextComponent } from "../Components/TextComponent";
import { DateRange } from "../DateRange";
import { DateRangePicker } from "./DateRangePicker";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { ValueRangePanelView } from "./ValueRangePanelView";

interface IResult {
    readonly done?: {};
}

class Result {
    static done() { return new Result({ done: {} }); }

    private constructor(private readonly result: IResult) { }

    get done() { return this.result.done; }
}

export class AbsoluteDateRangePanel extends BasicComponent implements IPanel {
    private readonly panelView: ValueRangePanelView;
    private readonly awaitable = new Awaitable<Result>();
    private options: FilterColumnOptionsBuilder;
    private readonly columnName: TextComponent;
    private readonly dateRangePicker: DateRangePicker;
    private readonly preview: TextComponent;

    constructor(view: ValueRangePanelView) {
        super(view.body);
        this.panelView = view;
        this.columnName = new TextComponent(view.columnName);
        this.dateRangePicker = this.addComponent(new DateRangePicker(view.valueRangePicker));
        this.dateRangePicker.when.valueChanged.then(this.onDateRangeChanged.bind(this));
        this.preview = new TextComponent(view.preview);
        new Command(this.cancel.bind(this)).add(view.cancelButton);
        new Command(this.save.bind(this)).add(view.saveButton);
    }

    private onDateRangeChanged(dateRange: DateRange) {
        this.preview.setText(dateRange.format());
    }

    private cancel() { this.awaitable.resolve(Result.done()); }

    private save() {
        const dateRange = this.dateRangePicker.getValue();
        this.options.setAbsoluteDateRangeValue(dateRange);
        this.awaitable.resolve(Result.done());
    }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        this.columnName.setText(options.column.displayText);
        const dateRange = new DateRange(null, null);
        this.dateRangePicker.setValue(dateRange);
        this.preview.setText(dateRange.format());
    }

    start() {
        this.dateRangePicker.setFocus();
        return this.awaitable.start();
    }

    activate() { this.panelView.show(); }

    deactivate() { this.panelView.hide(); }
}