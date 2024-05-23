import { DateTimeOffset } from "../DateTimeOffset";
import { EventSource } from "../Events";
import { TimeOnly } from "../TimeOnly";
import { DateTimeInputView } from "../Views/DateTimeInputView";
import { BasicComponent } from "./BasicComponent";
import { ComponentID } from "./ComponentID";
import { DateInputControl } from "./DateInputControl";
import { TimeInputControl } from "./TimeInputControl";

type Events = { valueChanged: DateTimeOffset };

export class DateTimeInputControl extends BasicComponent {
    private readonly dateInputControl: DateInputControl;
    private readonly timeInputControl: TimeInputControl;

    private readonly eventSource = new EventSource<Events>(this, { valueChanged: null as DateTimeOffset });
    readonly when = this.eventSource.when;

    constructor(protected readonly view: DateTimeInputView) {
        super(view);
        view.setViewID(ComponentID.nextID());
        this.dateInputControl = this.addComponent(new DateInputControl(view.dateInputView));
        this.timeInputControl = this.addComponent(new TimeInputControl(view.timeInputView));
        this.dateInputControl.when.valueChanged.then(this.onValueChanged.bind(this));
        this.timeInputControl.when.valueChanged.then(this.onValueChanged.bind(this));
    }

    getViewID() { return this.dateInputControl.getViewID(); }

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
    
    setValue(date: DateTimeOffset) {
        if (date) {
            this.dateInputControl.setValue(date.toDateOnly());
            this.timeInputControl.setValue(date.toTimeOnly());
        }
        else {
            this.dateInputControl.setValue(null);
            this.timeInputControl.setValue(null);
        }
    }

    getValue() {
        const date = this.dateInputControl.getValue();
        const time = this.timeInputControl.getValue() || new TimeOnly(0, 0);
        return date ?
            DateTimeOffset.create(date, time) :
            null;
    }

    setCustomValidity(errorMessage: string) {
        this.dateInputControl.setCustomValidity(errorMessage);
        this.timeInputControl.setCustomValidity(errorMessage);
        this.view.setTitle(errorMessage);
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }

    protected onDipose() {
        this.eventSource.unregisterAll();
    }
}