import { BasicComponent } from "../Components/BasicComponent";
import { BooleanInputControl } from "../Components/BooleanInputControl";
import { InputControl } from "../Components/InputControl";
import { DateOnly } from "../DateOnly";
import { DateRange } from "../DateRange";
import { DebouncedAction } from "../DebouncedAction";
import { EventSource } from '../Events';
import { TextToDateOnlyViewValue } from "../Forms/TextToDateOnlyViewValue";
import { ValueRangeBound } from "../ValueRangeBound";
import { ValueRangePickerView } from "./ValueRangePickerView";

type Events = { valueChanged: DateRange };

export class DateRangePicker extends BasicComponent {
    protected readonly view: ValueRangePickerView;
    private readonly fromCheck: BooleanInputControl;
    private readonly from: InputControl<DateOnly>;
    private readonly fromInclude: BooleanInputControl;
    private readonly toCheck: BooleanInputControl;
    private readonly to: InputControl<DateOnly>;
    private readonly toInclude: BooleanInputControl;

    private readonly eventSource = new EventSource<Events>(this, { valueChanged: null as DateRange });
    readonly when = this.eventSource.when;

    constructor(view: ValueRangePickerView) {
        super(view);
        this.fromCheck = this.addComponent(new BooleanInputControl(view.fromCheckInput));
        this.from = this.addComponent(new InputControl<DateOnly>(view.fromInput, new TextToDateOnlyViewValue()));
        view.fromInput.setType('date');
        this.fromInclude = this.addComponent(new BooleanInputControl(view.fromIncludeInput));
        this.toCheck = this.addComponent(new BooleanInputControl(view.toCheckInput));
        this.to = this.addComponent(new InputControl<DateOnly>(view.toInput, new TextToDateOnlyViewValue()));
        view.toInput.setType('date');
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
        this.from.setFocus();
        this.debouncedDateRangeChanged.execute();
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
        this.debouncedDateRangeChanged.execute();
    }

    private onFromIncludeChanged() {
        this.debouncedDateRangeChanged.execute();
    }

    private onToCheckChanged() {
        this.updateToVisibility();
        this.to.setFocus();
        this.debouncedDateRangeChanged.execute();
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
        this.debouncedDateRangeChanged.execute();
    }

    private onToIncludeChanged() {
        this.debouncedDateRangeChanged.execute();
    }

    private debouncedDateRangeChanged = new DebouncedAction(
        () => this.eventSource.events.valueChanged.invoke(this.getValue()),
        700
    );

    getValue() {
        const includeStart = this.fromInclude.getValue();
        const start = this.fromCheck.getValue()
            ? this.from.getValue()
            : null;
        const includeEnd = this.toInclude.getValue();
        const end = this.toCheck.getValue()
            ? this.to.getValue()
            : null;
        return new DateRange(
            new ValueRangeBound(start, includeStart),
            new ValueRangeBound(end, includeEnd)
        );
    }

    setValue(dateRange: DateRange) {
        this.fromCheck.setValue(Boolean(dateRange.start));
        this.from.setValue(dateRange.start && dateRange.start.value);
        this.fromInclude.setValue(dateRange.start && dateRange.start.isIncluded);
        this.toCheck.setValue(Boolean(dateRange.end));
        this.to.setValue(dateRange.end && dateRange.end.value);
        this.toInclude.setValue(dateRange.end && dateRange.end.isIncluded);
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

    protected onDipose() {
        this.eventSource.unregisterAll();
    }
}