import { DebouncedAction } from "../DebouncedAction";
import { DelayedAction } from "../DelayedAction";
import { EventSource } from "../Events";
import { TypedFieldViewValue } from "../Forms/TypedFieldViewValue";
import { InputView } from "../Views/InputView";
import { BasicComponent } from "./BasicComponent";

type Events<TValue> = { valueChanged: TValue };

export class InputControl<TValue> extends BasicComponent {
    protected readonly view: InputView;
    private readonly debouncedSetFocus: DebouncedAction;
    private previousValue: TValue;

    private readonly eventSource = new EventSource<Events<TValue>>(this, { valueChanged: null as TValue });
    readonly when = this.eventSource.when;

    constructor(
        view: InputView,
        private readonly viewValue: TypedFieldViewValue<string, TValue>
    ) {
        super(view);
        new DelayedAction(
            () => {
                const rawValue = this.view.getValue();
                this.viewValue.setValueFromView(rawValue);
            },
            100
        ).execute();
        this.debouncedSetFocus = new DebouncedAction(
            () => this.view.setFocus(),
            700
        );
        this.view.onInput()
            .execute(this.onInputValueChanged.bind(this))
            .subscribe();
    }

    private onInputValueChanged() {
        const viewValue = this.view.getValue();
        this.viewValue.setValueFromView(viewValue);
        this.debouncedOnInputValueChanged.execute();
    }

    private debouncedOnInputValueChanged = new DebouncedAction(
        () => {
            const currentRawValue = this.view.getValue();
            if (!this.view.hasFocus()) {
                const newViewValue = this.viewValue.toView();
                if (newViewValue !== currentRawValue) {
                    this.view.setValue(newViewValue);
                }
            }
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