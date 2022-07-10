import { Awaitable } from "../Awaitable";
import { BasicComponent } from "../Components/BasicComponent";
import { Command } from "../Components/Command";
import { TextComponent } from "../Components/TextComponent";
import { NumberRange } from "../NumberRange";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { NumberRangePicker } from "./NumberRangePicker";
import { ValueRangePanelView } from "./ValueRangePanelView";

interface IResult {
    readonly done?: {};
}

class Result {
    static done() { return new Result({ done: {} }); }

    private constructor(private readonly result: IResult) { }

    get done() { return this.result.done; }
}

export class AbsoluteNumberRangePanel extends BasicComponent implements IPanel {
    private readonly panelView: ValueRangePanelView;
    private readonly awaitable = new Awaitable<Result>();
    private options: FilterColumnOptionsBuilder;
    private readonly columnName: TextComponent;
    private readonly numberRangePicker: NumberRangePicker;
    private readonly preview: TextComponent;

    constructor(view: ValueRangePanelView) {
        super(view.body);
        this.panelView = view;
        this.columnName = new TextComponent(view.columnName);
        this.numberRangePicker = this.addComponent(new NumberRangePicker(view.valueRangePicker));
        this.numberRangePicker.when.valueChanged.then(this.onNumberRangeChanged.bind(this));
        this.preview = new TextComponent(view.preview);
        new Command(this.cancel.bind(this)).add(view.cancelButton);
        new Command(this.save.bind(this)).add(view.saveButton);
    }

    private onNumberRangeChanged(numberRange: NumberRange) {
        this.preview.setText(numberRange.format());
    }

    private cancel() { this.awaitable.resolve(Result.done()); }

    private save() {
        const numberRange = this.numberRangePicker.getValue();
        this.options.setAbsoluteNumberRangeValue(numberRange);
        this.awaitable.resolve(Result.done());
    }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        this.columnName.setText(options.column.displayText);
        this.numberRangePicker.setNumberFormat(options.column.numberFormat);
        const numberRange = new NumberRange(null, null, options.column.numberFormat);
        this.numberRangePicker.setValue(numberRange);
        this.preview.setText(numberRange.format());
    }

    start() {
        this.numberRangePicker.setFocus();
        return this.awaitable.start();
    }

    activate() { this.panelView.show(); }

    deactivate() { this.panelView.hide(); }
}