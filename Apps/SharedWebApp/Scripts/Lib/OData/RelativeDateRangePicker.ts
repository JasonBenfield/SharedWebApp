import { BasicComponent } from "../Components/BasicComponent";
import { FormCheck } from "../Components/FormCheck";
import { RelativeDateRange, RelativeDayOffset } from "../RelativeDateRange";
import { RelativeDateRangePickerView } from "./RelativeDateRangePickerView";
import { RelativeOffsetPicker } from "./RelativeOffsetPicker";
import { EventSource } from '../Events';
import { DebouncedAction } from "../DebouncedAction";

type Events = { valueChanged: RelativeDateRange };

export class RelativeDateRangePicker extends BasicComponent {
    protected readonly view: RelativeDateRangePickerView;
    private readonly fromCheck: FormCheck;
    private readonly from: RelativeOffsetPicker;
    private readonly toCheck: FormCheck;
    private readonly toRelativeToFromCheck: FormCheck;
    private readonly to: RelativeOffsetPicker;

    private readonly eventSource = new EventSource<Events>(this, { valueChanged: null as RelativeDateRange });
    readonly when = this.eventSource.when;

    constructor(view: RelativeDateRangePickerView) {
        super(view);
        this.fromCheck = this.addComponent(new FormCheck(view.fromCheck));
        this.from = this.addComponent(new RelativeOffsetPicker(view.fromOffsetPicker));
        this.toCheck = this.addComponent(new FormCheck(view.toCheck));
        this.toRelativeToFromCheck = this.addComponent(new FormCheck(view.toRelativeToFromCheck));
        this.to = this.addComponent(new RelativeOffsetPicker(view.toOffsetPicker));
        this.fromCheck.when.valueChanged.then(this.onFromCheckChanged.bind(this));
        this.from.when.valueChanged.then(this.onFromChanged.bind(this));
        this.toCheck.when.valueChanged.then(this.onToCheckChanged.bind(this));
        this.to.when.valueChanged.then(this.onToChanged.bind(this));
        this.toRelativeToFromCheck.when.valueChanged.then(this.onToRelativeToFromChanged.bind(this));
    }

    private onFromCheckChanged() {
        this.updateFromVisibility();
        this.from.setFocus();
        this.debouncedValueChanged.execute();
    }

    private updateFromVisibility() {
        if (this.fromCheck.getValue()) {
            this.from.show();
            this.from.setValue(new RelativeDayOffset(0));
        }
        else {
            this.from.hide();
        }
    }

    private onFromChanged() {
        this.debouncedValueChanged.execute();
    }

    private onToCheckChanged() {
        this.updateToVisibility();
        this.to.setFocus();
        this.debouncedValueChanged.execute();
    }

    private updateToVisibility() {
        if (this.toCheck.getValue()) {
            this.toRelativeToFromCheck.show();
            this.to.show();
            this.to.setValue(new RelativeDayOffset(0));
        }
        else {
            this.toRelativeToFromCheck.hide();
            this.to.hide();
        }
    }

    private onToChanged() {
        this.debouncedValueChanged.execute();
    }

    private onToRelativeToFromChanged() {
        this.updateOffsetType();
        this.debouncedValueChanged.execute();
    }

    private updateOffsetType() {
        if (this.toRelativeToFromCheck.getValue()) {
            this.to.offsetIsPositive();
        }
        else {
            this.to.offsetIsNegative();
        }
    }

    private readonly debouncedValueChanged = new DebouncedAction(
        () => this.eventSource.events.valueChanged.invoke(this.getValue()),
        700
    );

    getValue() {
        const relativeStart = this.fromCheck.getValue()
            ? this.from.getValue()
            : null;
        const relativeEnd = this.toCheck.getValue()
            ? this.to.getValue()
            : null;
        return new RelativeDateRange(
            relativeStart,
            relativeEnd,
            this.toRelativeToFromCheck.getValue()
        );
    }

    setValue(value: RelativeDateRange) {
        this.fromCheck.setValue(Boolean(value.relativeStart));
        this.from.setValue(value.relativeStart);
        this.updateFromVisibility();
        this.toCheck.setValue(Boolean(value.relativeStart));
        this.toRelativeToFromCheck.setValue(value.isEndRelativeToStart);
        this.updateOffsetType();
        this.to.setValue(value.relativeStart);
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

    protected onDipose() {
        this.eventSource.unregisterAll();
    }
}