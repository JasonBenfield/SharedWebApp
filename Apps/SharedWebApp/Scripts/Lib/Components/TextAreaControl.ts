import { DebouncedAction } from "../DebouncedAction";
import { DeviceType } from "../DeviceType";
import { EventSource } from "../Events";
import { InputView } from "../Views/InputView";
import { TextAreaView } from "../Views/TextAreaView";
import { BasicComponent } from "./BasicComponent";

type Events = { valueChanged: string };

export class TextAreaControl extends BasicComponent {
    private readonly debouncedSetFocus: DebouncedAction;
    private previousValue: string;

    private readonly eventSource = new EventSource<Events>(this, { valueChanged: null as string });
    readonly when = this.eventSource.when;

    constructor(protected readonly view: TextAreaView) {
        super(view);
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

    isBlank() { return !this.view.getValue(); }

    getValue() {
        return this.view.getValue();
    }

    setValue(value: string) {
        this.view.setValue(value);
    }

    setFocus() {
        if (new DeviceType().canFocus) {
            this.debouncedSetFocus.execute();
        }
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}