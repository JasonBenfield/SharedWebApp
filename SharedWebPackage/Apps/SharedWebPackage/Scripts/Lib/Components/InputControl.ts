import { DebouncedAction } from "../DebouncedAction";
import { DelayedAction } from "../DelayedAction";
import { DeviceType } from "../DeviceType";
import { EventSource } from "../Events";
import { TypedFieldViewValue } from "../Forms/TypedFieldViewValue";
import { InputView } from "../Views/InputView";
import { BasicComponent } from "./BasicComponent";
import { ComponentID } from "./ComponentID";
import { DataListComponent } from "./DataListComponent";

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
        view.setViewID(ComponentID.nextID());
        viewValue.setValueFromView('');
        this.previousValue = viewValue.getValue();
        this.debouncedSetFocus = new DebouncedAction(
            () => this.view.setFocus(),
            700
        );
        this.view.onInput()
            .execute(this.onInputValueChanged.bind(this))
            .subscribe();
        const initialValue = this.view.getValue();
        if (initialValue) {
            viewValue.setValueFromView(initialValue);
        }
        this.debouncedOnInputValueChanged.execute();
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
                    this.viewValue.setValueFromView(newViewValue);
                }
            }
            const currentValue = this.getValue();
            if (currentValue !== this.previousValue) {
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

    setType(type: 'text' | 'hidden' | 'date' | 'number' | 'time' | 'file' | 'email' | 'month' | 'url') {
        this.view.setType(type);
    }

    setInputMode(inputmode: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url') {
        this.view.setInputMode(inputmode);
    }

    isBlank() { return !this.view.getValue(); }

    setList(list: DataListComponent<TValue>) {
        this.view.setList(list.getViewID());
    }

    addDataList(...values: TValue[]) {
        const dataListView = this.view.addDataListView();
        const dataList = new DataListComponent<TValue>(dataListView, this.viewValue);
        this.setList(dataList);
        dataList.setOptions(...values);
        this.addComponent(dataList);
        return dataList;
    }

    getTextValue() {
        return this.view.getValue();
    }

    getValue() {
        return this.viewValue.getValue();
    }

    setValue(value: TValue) {
        this.viewValue.setValue(value);
        const inputValue = this.viewValue.toView();
        this.view.setValue(inputValue);
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

    blur() {
        this.view.blur();
    }

    protect() {
        this.view.setType('password');
    }

    setMaxLength(maxLength: number) {
        this.view.setMaxLength(maxLength);
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }

    protected onDipose() {
        this.eventSource.unregisterAll();
    }
}