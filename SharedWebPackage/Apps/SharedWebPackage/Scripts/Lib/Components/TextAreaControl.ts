import { DebouncedAction } from "../DebouncedAction";
import { DelayedAction } from "../DelayedAction";
import { DeviceType } from "../DeviceType";
import { EventSource } from "../Events";
import { InputView } from "../Views/InputView";
import { TextAreaView } from "../Views/TextAreaView";
import { BasicComponent } from "./BasicComponent";
import { ComponentID } from "./ComponentID";

type Events = { valueChanged: string };

export class TextAreaControl extends BasicComponent {
    private readonly debouncedSetFocus: DebouncedAction;
    private previousValue: string;

    private readonly eventSource = new EventSource<Events>(this, { valueChanged: null as string });
    readonly when = this.eventSource.when;

    constructor(protected readonly view: TextAreaView) {
        super(view);
        view.setViewID(ComponentID.nextID());
        this.debouncedSetFocus = new DebouncedAction(
            () => this.view.setFocus(),
            700
        );
        this.view.onInput()
            .execute(this.onInputValueChanged.bind(this))
            .subscribe();
    }

    private onInputValueChanged() {
        this.debouncedOnInputValueChanged.execute();
    }

    private debouncedOnInputValueChanged = new DebouncedAction(
        () => {
            const currentValue = this.getValue();
            if (this.getValue() !== this.previousValue) {
                this.eventSource.events.valueChanged.invoke(currentValue);
                this.previousValue = currentValue;
            }
        },
        700
    );

    required() {
        this.view.required();
    }

    notRequired() {
        this.view.notRequired();
    }

    setCustomValidity(message: string) {
        this.view.setCustomValidity(message);
    }

    isBlank() { return !this.view.getValue(); }

    getValue() {
        return this.view.getValue();
    }

    setValue(value: string) {
        this.view.setValue(value);
        this.previousValue = value;
    }

    setFocus(delay = 0) {
        if (DeviceType.instance.canFocus) {
            if (delay) {
                new DelayedAction(
                    () => this.debouncedSetFocus.execute(),
                    delay
                ).execute();
            }
            else {
                this.debouncedSetFocus.execute();
            }
        }
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }

    protected onDipose() {
        this.eventSource.unregisterAll();
    }
}