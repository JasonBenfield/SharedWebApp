import { ComponentViewModel } from "./ComponentViewModel";
import { EventManager } from "./EventManager";

type EventLayout<TViewModel extends ComponentViewModel> = {
    arrayChanged: ObservableArrayChange<TViewModel>[];
}

export class ObservableArray<TViewModel extends ComponentViewModel> {
    private readonly _eventManager = new EventManager<EventLayout<TViewModel>>({
        arrayChanged: null
    });
    readonly when = this._eventManager.when;

    private readonly _values: TViewModel[] = [];

    get length() { return this._values.length; }

    getValues() { return this._values.map(vm => vm); }

    push(...values: TViewModel[]) {
        let i = this._values.length;
        this._values.push(...values);
        const changes: ObservableArrayChange<TViewModel>[] = [];
        for (const value of values) {
            changes.push(
                new ObservableArrayChange(
                    this,
                    "add",
                    i,
                    value,
                    -1
                )
            );
            i++;
        }
        this._eventManager.events.arrayChanged.invoke(changes);
    }

    splice(startIndex: number, deleteCount: number, ...values: TViewModel[]) {
        const deletedValues = this._values.splice(startIndex, deleteCount, ...values);
        const changes: ObservableArrayChange<TViewModel>[] = [];
        let i = startIndex;
        for (const value of deletedValues) {
            changes.push(
                new ObservableArrayChange(
                    this,
                    "remove",
                    -1,
                    value,
                    i
                )
            );
            i++;
        }
        i = startIndex;
        for (const value of values) {
            changes.push(
                new ObservableArrayChange(
                    this,
                    "add",
                    i,
                    value,
                    -1
                )
            );
            i++;
        }
        this._eventManager.events.arrayChanged.invoke(changes);
    }

    replaceWith(...updatedValues: TViewModel[]) {
        const changes: ObservableArrayChange<TViewModel>[] = [];
        const originalValues = this._values.map(v => v);
        for (let i = 0; i < updatedValues.length; i++) {
            const updatedValue = updatedValues[i];
            if (originalValues[i] !== updatedValue) {
                const originalIndex = originalValues.indexOf(updatedValue);
                if (originalIndex > -1) {
                    changes.push(
                        new ObservableArrayChange(
                            this,
                            "move",
                            i,
                            updatedValue,
                            originalIndex
                        )
                    );
                }
                else {
                    changes.push(
                        new ObservableArrayChange(
                            this,
                            "insert",
                            i,
                            updatedValue,
                            originalIndex
                        )
                    );
                }
            }
        }
        for (let i = 0; i < originalValues.length; i++) {
            const originalValue = originalValues[i];
            const updatedIndex = updatedValues.indexOf(originalValue);
            if (updatedIndex < 0) {
                changes.push(
                    new ObservableArrayChange(
                        this,
                        "remove",
                        -1,
                        originalValue,
                        i
                    )
                );
            }
        }
        this._values.splice(0, this._values.length, ...updatedValues);
        this._eventManager.events.arrayChanged.invoke(changes);
    }

    dispose() {
        this._eventManager.dispose();
        for (const value of this._values) {
            value.dispose();
        }
        this._values.splice(0, this._values.length);
    }
}

export class ObservableArrayChange<TViewModel extends ComponentViewModel> {
    constructor(
        readonly target: any,
        readonly action: "add" | "insert" | "remove" | "move",
        readonly index: number,
        readonly item: TViewModel,
        readonly originalIndex: number
    ) {
    }
}