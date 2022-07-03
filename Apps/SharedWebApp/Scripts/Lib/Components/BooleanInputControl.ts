import { EventSource } from "../Events";
import { BooleanInputView } from "../Views/BooleanInputView";

export class BooleanInputControl {
    private readonly events = { valueChanged: null as boolean };
    private readonly eventSource = new EventSource<typeof this.events>(this, this.events);
    readonly when = this.eventSource.when;

    constructor(private readonly view: BooleanInputView) {
        this.view.onChange()
            .execute(this.onInputValueChanged.bind(this))
            .subscribe();
    }

    private onInputValueChanged() {
        const value = this.view.getValue();
        this.eventSource.events.valueChanged.invoke(value);
    }

    getValue() {
        return this.view.getValue();
    }

    setValue(value: boolean) {
        this.view.setValue(value);
    }
}