import { DebouncedAction } from "../DebouncedAction";
import { ChangedProperty, ComponentViewModel, ObservableChanges, UpdatedViewModel } from "./ComponentViewModel";
import { EventManager } from "./EventManager";
import { MvvmPage } from "./MvvmPage";

type EventLayout<TViewModel extends ComponentViewModel> = {
    arrayChanged: ChangedObservableArray<TViewModel>[];
    arrayItemChanged: ChangedObservableArrayItem<TViewModel>[];
}

type ItemEventLayout = {
    propertyChanged: UpdatedViewModel;
}

export class ObservableArray<TViewModel extends ComponentViewModel> {
    private readonly _eventManager = new EventManager<EventLayout<TViewModel>>({
        arrayChanged: null,
        arrayItemChanged: null
    });
    readonly when = this._eventManager.when;

    private readonly _itemEventManager = new EventManager<ItemEventLayout>({
        propertyChanged: null
    });

    private readonly _values: TViewModel[] = [];
    private readonly _changedItemProperties: ChangedProperty[] = [];

    constructor() {
        this._itemEventManager.when.propertyChanged.then(this.handlePropertyChanged.bind(this));
    }

    private handlePropertyChanged(event: CustomEvent<UpdatedViewModel>) {
        this._changedItemProperties.push(event.detail.changedProperty);
        this.debouncedHandlePropertyChanged.execute();
    }

    private readonly debouncedHandlePropertyChanged = new DebouncedAction(
        () => {
            const changedItemProperties = this._changedItemProperties.splice(0, this._changedItemProperties.length);
            if (changedItemProperties.length > 0) {
                const itemChanges: ChangedObservableArrayItem<TViewModel>[] = [];
                for (const changedItemProperty of changedItemProperties) {
                    const viewModel = changedItemProperty.target as TViewModel;
                    let itemChange = itemChanges.find(c => c.viewModel === viewModel);
                    if (!itemChange) {
                        itemChange = new ChangedObservableArrayItem(this, viewModel, {});
                        itemChanges.push(itemChange);
                    }
                    Reflect.set(itemChange.changes, changedItemProperty.propertyName, changedItemProperty);
                }
                this._eventManager.events.arrayItemChanged.invoke(itemChanges);
            }
        },
        MvvmPage.get().options.debouncedViewModelChangedWait
    );

    get length() { return this._values.length; }

    getValues() { return Array.from(this._values); }

    push(...values: TViewModel[]) {
        let i = this._values.length;
        this._values.push(...values);
        const changes: ChangedObservableArray<TViewModel>[] = [];
        for (const value of values) {
            value.notify(this._itemEventManager);
            changes.push(
                new ChangedObservableArray(
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
        const changes: ChangedObservableArray<TViewModel>[] = [];
        let i = startIndex;
        for (const removedValue of removedValues) {
            changes.push(
                new ChangedObservableArray(
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
            addedValue.notify(this._itemEventManager);
            changes.push(
                new ChangedObservableArray(
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
        const changes: ChangedObservableArray<TViewModel>[] = [];
        const originalValues = Array.from(this._values);
        for (let i = 0; i < updatedValues.length; i++) {
            const updatedValue = updatedValues[i];
            if (originalValues[i] !== updatedValue) {
                const originalIndex = originalValues.indexOf(updatedValue);
                if (originalIndex > -1) {
                    changes.push(
                        new ChangedObservableArray(
                            this,
                            "move",
                            i,
                            updatedValue,
                            originalIndex
                        )
                    );
                }
                else {
                    updatedValue.notify(this._itemEventManager);
                    changes.push(
                        new ChangedObservableArray(
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
                    new ChangedObservableArray(
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
        this._itemEventManager.dispose();
        this._eventManager.dispose();
        const values = this._values.splice(0, this._values.length);
        for (const value of values) {
            value.dispose();
        }
    }
}

export class ChangedObservableArray<TViewModel extends ComponentViewModel> {
    constructor(
        readonly target: any,
        readonly action: "add" | "insert" | "remove" | "move",
        readonly index: number,
        readonly item: TViewModel,
        readonly originalIndex: number
    ) {
    }
}

export class ChangedObservableArrayItem<TViewModel extends ComponentViewModel> {
    constructor(
        readonly array: ObservableArray<TViewModel>,
        readonly viewModel: TViewModel,
        readonly changes: ObservableChanges<TViewModel>
    ) {
    }
}