import { EventSource } from "../Events";
import { BooleanInputView } from "../Views/BooleanInputView";
import { BasicComponent } from "./BasicComponent";

export type BooleanInputControlEvents = { valueChanged: boolean };

export class BooleanInputControl extends BasicComponent {
    protected readonly view: BooleanInputView;
    private readonly eventSource = new EventSource<BooleanInputControlEvents>(
        this,
        { valueChanged: null as boolean }
    );
    readonly when = this.eventSource.when;

    constructor(view: BooleanInputView) {
        super(view);
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

    protected onDispose() {
        this.eventSource.unregisterAll();
    }
}