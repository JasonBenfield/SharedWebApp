import { ComponentViewModel, PropertyChange } from "./ComponentViewModel";
import { EventManager } from "./EventManager";

type EventLayout<TViewModel extends ComponentViewModel> = {
    arrayChanged: ObservableArrayChange<TViewModel>[];
    propertyChanged: { [name: string]: PropertyChange };
}

export class ObservableArray<TViewModel extends ComponentViewModel> {
    private readonly _eventManager = new EventManager<EventLayout<TViewModel>>({
        arrayChanged: null,
        propertyChanged: null
    });
    readonly when = this._eventManager.when;

    private readonly _values: TViewModel[] = [];

    get length() { return this._values.length; }

    getValues() { return Array.from(this._values); }

    push(...values: TViewModel[]) {
        let i = this._values.length;
        this._values.push(...values);
        const changes: ObservableArrayChange<TViewModel>[] = [];
        for (const value of values) {
            value.notify(this._eventManager);
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

    splice(startIndex: number, deleteCount: number, ...addedValues: TViewModel[]) {
        const removedValues = this._values.splice(startIndex, deleteCount, ...addedValues);
        const changes: ObservableArrayChange<TViewModel>[] = [];
        let i = startIndex;
        for (const removedValue of removedValues) {
            changes.push(
                new ObservableArrayChange(
                    this,
                    "remove",
                    -1,
                    removedValue,
                    i
                )
            );
            i++;
        }
        i = startIndex;
        for (const addedValue of addedValues) {
            addedValue.notify(this._eventManager);
            changes.push(
                new ObservableArrayChange(
                    this,
                    "add",
                    i,
                    addedValue,
                    -1
                )
            );
            i++;
        }
        this._eventManager.events.arrayChanged.invoke(changes);
    }

    replaceWith(...updatedValues: TViewModel[]) {
        const changes: ObservableArrayChange<TViewModel>[] = [];
        const originalValues = Array.from(this._values);
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
                    updatedValue.notify(this._eventManager);
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
        const values = this._values.splice(0, this._values.length);
        for (const value of values) {
            value.dispose();
        }
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