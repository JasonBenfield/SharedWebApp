import { BasicComponent } from "../Components/BasicComponent";
import { BooleanInputControl } from "../Components/BooleanInputControl";
import { InputControl } from "../Components/InputControl";
import { DebouncedAction } from "../DebouncedAction";
import { EventSource } from '../Events';
import { TextToNumberViewValue } from "../Forms/TextToNumberViewValue";
import { NumberRange } from "../NumberRange";
import { ValueRangeBound } from "../ValueRangeBound";
import { ValueRangePickerView } from "./ValueRangePickerView";

type Events = { valueChanged: NumberRange };

export class NumberRangePicker extends BasicComponent {
    protected readonly view: ValueRangePickerView;
    private readonly fromCheck: BooleanInputControl;
    private readonly from: InputControl<number>;
    private readonly fromInclude: BooleanInputControl;
    private readonly toCheck: BooleanInputControl;
    private readonly to: InputControl<number>;
    private readonly toInclude: BooleanInputControl;
    private _numberFormat: string;

    private readonly eventSource = new EventSource<Events>(this, { valueChanged: null as NumberRange });
    readonly when = this.eventSource.when;

    constructor(view: ValueRangePickerView) {
        super(view);
        this.fromCheck = this.addComponent(new BooleanInputControl(view.fromCheckInput));
        this.from = this.addComponent(new InputControl<number>(view.fromInput, new TextToNumberViewValue()));
        this.fromInclude = this.addComponent(new BooleanInputControl(view.fromIncludeInput));
        this.toCheck = this.addComponent(new BooleanInputControl(view.toCheckInput));
        this.to = this.addComponent(new InputControl<number>(view.toInput, new TextToNumberViewValue()));
        this.toInclude = this.addComponent(new BooleanInputControl(view.toIncludeInput));
        this.fromCheck.when.valueChanged.then(this.onFromCheckChanged.bind(this));
        this.from.when.valueChanged.then(this.onFromChanged.bind(this));
        this.fromInclude.when.valueChanged.then(this.onFromIncludeChanged.bind(this));
        this.toCheck.when.valueChanged.then(this.onToCheckChanged.bind(this));
        this.to.when.valueChanged.then(this.onToChanged.bind(this));
        this.toInclude.when.valueChanged.then(this.onToIncludeChanged.bind(this));
    }

    private onFromCheckChanged() {
        this.updateFromVisibility();
        this.updateFrom();
        this.from.setFocus();
        this.debouncedNumberRangeChanged.execute();
    }

    private updateFromVisibility() {
        if (this.fromCheck.getValue()) {
            this.view.showFromInput();
        }
        else {
            this.view.hideFromInput();
        }
    }

    private onFromChanged() {
        this.updateTo();
        this.debouncedNumberRangeChanged.execute();
    }

    private onFromIncludeChanged() {
        this.updateTo();
        this.debouncedNumberRangeChanged.execute();
    }

    private updateTo() {
        if (this.fromCheck.getValue() && this.toCheck.getValue()) {
            let from = this.from.getValue();
            if (from !== null) {
                if (this.fromInclude.getValue()) {
                    from++;
                }
                const to = this.to.getValue();
                if (to < from) {
                    this.to.setValue(from);
                }
            }
        }
    }

    private onToCheckChanged() {
        this.updateToVisibility();
        this.updateTo();
        this.to.setFocus();
        this.debouncedNumberRangeChanged.execute();
    }

    private updateToVisibility() {
        if (this.toCheck.getValue()) {
            this.view.showToInput();
        }
        else {
            this.view.hideToInput();
        }
    }

    private onToChanged() {
        this.updateFrom();
        this.debouncedNumberRangeChanged.execute();
    }

    private onToIncludeChanged() {
        this.updateFrom();
        this.debouncedNumberRangeChanged.execute();
    }

    private updateFrom() {
        if (this.fromCheck.getValue() && this.toCheck.getValue()) {
            const from = this.from.getValue();
            let to = this.to.getValue();
            if (to !== null) {
                if (this.toInclude.getValue()) {
                    to--;
                }
                if (from > to) {
                    this.from.setValue(to);
                }
            }
        }
    }

    private debouncedNumberRangeChanged = new DebouncedAction(
        () => this.eventSource.events.valueChanged.invoke(this.getValue()),
        700
    );

    setNumberFormat(numberFormat: string) {
        this._numberFormat = numberFormat;
    }

    getValue() {
        const includeStart = this.fromInclude.getValue();
        const start = this.fromCheck.getValue()
            ? this.from.getValue()
            : null;
        const includeEnd = this.toInclude.getValue();
        const end = this.toCheck.getValue()
            ? this.to.getValue()
            : null;
        return new NumberRange(
            start ? new ValueRangeBound(start, includeStart) : null,
            end ? new ValueRangeBound(end, includeEnd) : null,
            this._numberFormat
        );
    }

    setValue(numberRange: NumberRange) {
        this.fromCheck.setValue(Boolean(numberRange.start));
        this.from.setValue(numberRange.start && numberRange.start.value);
        this.fromInclude.setValue(numberRange.start && numberRange.start.isIncluded);
        this.toCheck.setValue(Boolean(numberRange.end));
        this.to.setValue(numberRange.end && numberRange.end.value);
        this.toInclude.setValue(numberRange.end && numberRange.end.isIncluded);
        this.updateFromVisibility();
        this.updateToVisibility();
    }

    setFocus() {
        if (this.fromCheck.getValue()) {
            this.from.setFocus();
        }
        else if (this.toCheck.getValue()) {
            this.to.setFocus();
        }
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}