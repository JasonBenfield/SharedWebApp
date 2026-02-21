import { ComponentViewModel } from "./ComponentViewModel";

export class ObservableArray<TViewModel extends ComponentViewModel> {
    private static readonly arrayChangedEventType = "arrayChanged";

    private readonly _values: TViewModel[] = [];
    private readonly _eventTarget = new EventTarget();
    private readonly _eventListeners: EventListener[] = [];

    get values() { return this._values.map(vm => vm); }

    push(...values: TViewModel[]) {
        const length = this._values.length;
        this._values.push(...values);
        const eventTarget = this._eventTarget;
        if (eventTarget) {
            const changes: ObservableArrayChange<TViewModel>[] = [];
            for (let i = 0; i < values.length; i++) {
                changes.push(
                    new ObservableArrayChange(
                        this,
                        "add",
                        length + i,
                        values[i]
                    )
                )
            }
            eventTarget.dispatchEvent(
                new CustomEvent(
                    ObservableArray.arrayChangedEventType,
                    {
                        detail: changes
                    }
                )
            );
        }
    }

    splice(startIndex: number, deleteCount: number, ...values: TViewModel[]) {
        const deletedValues = this._values.splice(startIndex, deleteCount, ...values);
        const length = this._values.length;
        this._values.push(...values);
        const eventTarget = this._eventTarget;
        if (eventTarget) {
            const changes: ObservableArrayChange<TViewModel>[] = [];
            for (let i = startIndex; i < deleteCount; i++) {
                changes.push(
                    new ObservableArrayChange(
                        this,
                        "remove",
                        i,
                        deletedValues[i]
                    )
                )
            }
            for (let i = 0; i < values.length; i++) {
                changes.push(
                    new ObservableArrayChange(
                        this,
                        "add",
                        length + i,
                        values[i]
                    )
                )
            }
            eventTarget.dispatchEvent(
                new CustomEvent(
                    ObservableArray.arrayChangedEventType,
                    {
                        detail: changes
                    }
                )
            );
        }
    }


    registerArrayChangedEvent(eventListener: EventListener) {
        this._eventListeners.push(eventListener);
        this._eventTarget.addEventListener(ObservableArray.arrayChangedEventType, eventListener);
    }

    unregisterArrayChangedEvent(eventListener: EventListener) {
        this._eventTarget.removeEventListener(ObservableArray.arrayChangedEventType, eventListener);
        const index = this._eventListeners.indexOf(eventListener);
        if (index > -1) {
            this._eventListeners.splice(index, 1);
        }
    }

    dispose() {
        for (const eventListener of this._eventListeners) {
            this._eventTarget.removeEventListener(ObservableArray.arrayChangedEventType, eventListener);
        }
        this._eventListeners.splice(0, this._eventListeners.length);
        for (const value of this._values) {
            value.dispose();
        }
        this._values.splice(0, this._values.length);
    }
}

export class ObservableArrayChange<TViewModel extends ComponentViewModel> {
    constructor(
        readonly target: any,
        readonly action: "add" | "remove",
        readonly index: number,
        readonly item: TViewModel
    ) {
    }
}