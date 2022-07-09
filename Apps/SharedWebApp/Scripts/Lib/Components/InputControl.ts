import { DebouncedAction } from "../DebouncedAction";
import { EventSource } from "../Events";
import { TypedFieldViewValue } from "../Forms/TypedFieldViewValue";
import { InputView } from "../Views/InputView";
import { BasicComponent } from "./BasicComponent";

type Events<TValue> = { valueChanged: TValue };

export class InputControl<TValue> extends BasicComponent {
    protected readonly view: InputView;
    private debouncedSetFocus: DebouncedAction;

    private readonly eventSource = new EventSource<Events<TValue>>(this, { valueChanged: null as TValue });
    readonly when = this.eventSource.when;

    constructor(
        view: InputView,
        private readonly viewValue: TypedFieldViewValue<string, TValue>
    ) {
        super(view);
        this.debouncedSetFocus = new DebouncedAction(() => this.setFocus(), 700);
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

    setFocus() { this.debouncedSetFocus.execute(); }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}