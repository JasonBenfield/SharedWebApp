import { DateOnly } from "../DateOnly";
import { EventSource } from "../Events";
import { TimeOnly } from "../TimeOnly";
import { DateTimeInputView } from "../Views/DateTimeInputView";
import { BasicComponent } from "./BasicComponent";
import { DateInputControl } from "./DateInputControl";
import { TimeInputControl } from "./TimeInputControl";

type Events = { valueChanged: Date };

export class DateTimeInputControl extends BasicComponent {
    private readonly dateInputControl: DateInputControl;
    private readonly timeInputControl: TimeInputControl;

    private readonly eventSource = new EventSource<Events>(this, { valueChanged: null as Date });
    readonly when = this.eventSource.when;

    constructor(protected readonly view: DateTimeInputView) {
        super(view);
        this.dateInputControl = this.addComponent(new DateInputControl(view.dateInputView));
        this.timeInputControl = this.addComponent(new TimeInputControl(view.timeInputView));
        this.dateInputControl.when.valueChanged.then(this.onValueChanged.bind(this));
        this.timeInputControl.when.valueChanged.then(this.onValueChanged.bind(this));
    }

    required() {
        this.view.required();
    }

    notRequired() {
        this.view.notRequired();
    }
    
    private onValueChanged() {
        const value = this.getValue();
        this.eventSource.events.valueChanged.invoke(value);
    }
    
    setValue(date: Date) {
        this.dateInputControl.setValue(DateOnly.fromDate(date));
        this.timeInputControl.setValue(TimeOnly.fromDateTime(date));
    }

    getValue() {
        const date = this.dateInputControl.getValue();
        const time = this.timeInputControl.getValue();
        return date && time ?
            new Date(date.year, date.month, date.date, time.hours, time.minutes, time.seconds, time.milliseconds) :
            null;
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}