import { DebouncedAction } from "../DebouncedAction";
import { EventSource } from "../Events";
import { TypedFieldViewValue } from "../Forms/TypedFieldViewValue";
import { InputView } from "../Views/InputView";

export class InputControl<TValue> {
    private readonly events = { valueChanged: null as TValue };
    private readonly eventSource = new EventSource<typeof this.events>(this, this.events);
    readonly when = this.eventSource.when;

    constructor(
        private readonly view: InputView,
        private readonly viewValue: TypedFieldViewValue<string, TValue>
    ) {
        this.view.onInput()
            .execute(this.onInputValueChanged.bind(this))
            .subscribe();
    }

    private onInputValueChanged() {
        const viewValue = this.view.getValue();
        const value = this.viewValue.setValueFromView(viewValue);
        this.eventSource.events.valueChanged.invoke(value);
        this.debouncedOnInputValueChanged.execute();
    }

    private debouncedOnInputValueChanged = new DebouncedAction(
        () => {
            if (!this.view.hasFocus()) {
                const currentValue = this.view.getValue();
                const newValue = this.viewValue.toView();
                if (newValue !== currentValue) {
                    this.view.setValue(newValue);
                }
            }
        },
        700
    );

    isBlank() { return !this.view.getValue(); }

    getValue() {
        return this.viewValue.getValue();
    }

    setValue(value: TValue) {
        this.viewValue.setValue(value);
        const inputValue = this.viewValue.toView();
        this.view.setValue(inputValue);
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}