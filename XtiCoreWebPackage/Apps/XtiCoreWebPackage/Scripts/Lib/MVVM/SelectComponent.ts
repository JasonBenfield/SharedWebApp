import { ConsoleLogger } from "../ConsoleLogger";
import { DebouncedAction } from "../DebouncedAction";
import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ChangedProperty, ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { areValuesEqual, IEquatable } from "./Equatable";
import { CustomEventRegistrations } from "./EventManager";
import { MvvmOptions } from "./MvvmOptions";
import { ChangedObservableArray, ObservableArray } from "./ObservableArray";
import { BaseOptionComponentView, BaseOptionComponentViewModel, IOptionComponentUpdater, OptionComponent, OptionComponentView, OptionComponentViewModel } from "./OptionComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { Constructor } from "./Types";
import { IUniqueView, IUniqueViewModel, UniqueComponentChangeHandler, UniqueComponentMixin, UniqueViewMixin, UniqueViewModelMixin } from "./UniqueComponent";

export class SelectedIndexValue implements IEquatable {
    constructor(readonly value: number, readonly isFromUI = false) {
    }

    equals(other: SelectedIndexValue) {
        let result: boolean;
        if (other) {
            result = areValuesEqual(this.value, other.value) && this.isFromUI === other.isFromUI;
        }
        else {
            result = false;
        }
        return result;
    }

    toString() {
        return `value: '${this.value}', isFromUI: ${this.isFromUI}`;
    }
}

export interface ISelectViewModel<TValue> {
    readonly items: ObservableArray<BaseOptionComponentViewModel<TValue>>;

    createItem(value: TValue): BaseOptionComponentViewModel<TValue>;

    get selectedIndex(): SelectedIndexValue;
    set selectedIndex(selectedIndex: SelectedIndexValue);

    get value(): TValue | null;
    set value(value: TValue | null);

    get preferredValue(): TValue | null;
    set preferredValue(value: TValue | null);
}

export type BaseSelectComponentViewModel<TValue> = ComponentViewModel & ISelectViewModel<TValue> & IUniqueViewModel;

export class SelectComponentViewModel<TValue>
    extends UniqueViewModelMixin(ComponentViewModel)
    implements IUniqueViewModel, ISelectViewModel<TValue> {

    readonly items = new ObservableArray<BaseOptionComponentViewModel<TValue>>();

    createItem(value: TValue) { return new OptionComponentViewModel(value); }

    private _value: TValue | null = null;
    get value() { return this._value; }
    set value(value: TValue | null) { this._value = value; }

    private _preferredValue: TValue | null = null;
    get preferredValue() { return this._preferredValue; }
    set preferredValue(preferredValue: TValue | null) { this._preferredValue = preferredValue; }

    private _selectedIndex = new SelectedIndexValue(-1);
    get selectedIndex() { return this._selectedIndex; }
    set selectedIndex(selectedIndex: SelectedIndexValue) { this._selectedIndex = selectedIndex; }
}

type SelectViewEventLayout = {
    changed: Event;
}

export interface ISelectView {
    readonly whenSelect: CustomEventRegistrations<SelectViewEventLayout>;

    getItems(): BaseOptionComponentView[];

    createItem(): BaseOptionComponentView;

    addItem(item: BaseOptionComponentView): void;

    insertItem(item: BaseOptionComponentView, index: number): void;

    removeItem(item: BaseOptionComponentView): void;

    getSelectedIndex(): number;

    setSelectedIndex(selectedIndex: number): void;

    clearSelection(): void;
}

export function SelectViewMixin<T extends Constructor<ComponentView>>(Base: T) {
    return class extends Base implements ISelectView {

        private readonly selectEvents = this.eventManager.addEvents<SelectViewEventLayout>({
            changed: null
        });
        get whenSelect() {
            if (!this.hasRegisteredSelectEvents) {
                this.setEventListener(
                    "change",
                    this.handleChangeEvent.bind(this) as any
                );
                this.hasRegisteredSelectEvents = true;
            }
            return this.selectEvents.when;
        }

        private hasRegisteredSelectEvents = false;

        private handleChangeEvent(evt: Event) {
            this.selectEvents.events.changed.invoke(evt);
        }

        getItems() { return this.getChildViews() as BaseOptionComponentView[]; }

        createItem() { return new OptionComponentView(); }

        addItem(view: BaseOptionComponentView) {
            this.addChildView(view);
        }

        insertItem(view: BaseOptionComponentView, index: number) {
            this.insertChildView(view, index);
        }

        removeItem(view: BaseOptionComponentView) {
            this.removeChildView(view);
        }

        protected get selectElement() { return this.element as HTMLSelectElement; }

        private _selectedIndex = -1;

        addToDom(index: number) {
            super.addToDom(index);
            const selectedIndex = this._selectedIndex;
            const element = this.selectElement;
            if (element) {
                element.selectedIndex = selectedIndex;
            }
        }

        getSelectedIndex() {
            let selectedIndex = this._selectedIndex;
            const element = this.selectElement;
            if (element) {
                const index = element.selectedIndex;
                if (index > -1) {
                    const optionElement = element.options[index];
                    selectedIndex = this.getItems().findIndex(
                        item => item.elementEquals(optionElement)
                    );
                }
                else {
                    selectedIndex = -1;
                }
            }
            return selectedIndex;
        }

        setSelectedIndex(selectedIndex: number) {
            this._selectedIndex = selectedIndex;
            const element = this.selectElement;
            if (element) {
                if (selectedIndex > -1) {
                    let i = 0;
                    const item = this.getChildViews()[selectedIndex];
                    if (item) {
                        for (const option of element.options) {
                            if (item.elementEquals(option)) {
                                element.selectedIndex = i;
                                break;
                            }
                            i++;
                        }
                    }
                }
                else {
                    element.selectedIndex = selectedIndex;
                }
            }
        }

        clearSelection() {
            this.setSelectedIndex(-1);
        }
    };
}

export class SelectComponentView
    extends SelectViewMixin(UniqueViewMixin(StyleableComponentViewMixin(ComponentView)))
    implements ISelectView, IUniqueView {

    constructor() {
        super("select");
    }

    simulateChange(selectedIndex: number) {
        const element = this.element as HTMLSelectElement;
        if (element && !element.disabled) {
            element.selectedIndex = selectedIndex;
            element.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
        }
    }

}

export type BaseSelectComponentView = ComponentView & ISelectView & IUniqueView;

type SelectComponentEventLayout<TValue> = {
    valueChanged: TValue;
}

export class SelectComponentChangeHandler<TValue> extends ComponentChangeHandler<BaseSelectComponentViewModel<TValue>, BaseSelectComponentView> {
    constructor(viewModel: BaseSelectComponentViewModel<TValue>, view: BaseSelectComponentView) {
        super(viewModel, view);
    }

    handleChanges(changes: ObservableChanges<BaseSelectComponentViewModel<TValue>>) {
        if (changes.selectedIndex) {
            const selectedIndex = changes.selectedIndex.value;
            if (!selectedIndex.isFromUI) {
                this.updateView(v => v.setSelectedIndex(selectedIndex.value));
            }
        }
    }
}

export class SelectComponent<TValue> extends UniqueComponentMixin(Component) {

    constructor(
        protected readonly viewModel: BaseSelectComponentViewModel<TValue>,
        protected readonly view: BaseSelectComponentView,
        private readonly valueWhenNull: TValue,
        itemUpdater?: IOptionComponentUpdater<TValue>
    ) {
        super(
            viewModel,
            view,
            new UniqueComponentChangeHandler(viewModel, view),
            new SelectComponentChangeHandler(viewModel, view)
        );
        if (viewModel.value === null) {
            viewModel.value = valueWhenNull;
            viewModel.preferredValue = valueWhenNull;
        }
        this.isMatch = itemUpdater?.isMatch || areValuesEqual;
        this.formatValue = itemUpdater?.formatValue || (() => null);
        this.formatText = itemUpdater?.formatText || ((v) => `${v}`);
        let i = 1;
        for (const itemVM of viewModel.items.getValues()) {
            this.insertItemComponent(itemVM, i);
            i++;
        }
        viewModel.items.when.arrayChanged.then(this.handleItemsChanged.bind(this));
        this.view.whenSelect.changed.then(this.onValueChangedFromUI.bind(this));
    }

    private readonly registeredEvents = this.eventManager.addEvents<SelectComponentEventLayout<TValue>>({
        valueChanged: null
    });
    readonly when = this.registeredEvents.when;
    private readonly _itemChanges: ChangedObservableArray<BaseOptionComponentViewModel<TValue>>[] = [];
    private readonly _itemComponents: Map<BaseOptionComponentViewModel<TValue>, OptionComponent<TValue>> = new Map();
    private readonly isMatch: (value1: TValue, value2: TValue) => boolean;
    private readonly formatValue: (value: TValue) => string | null;
    private readonly formatText: (value: TValue) => string;

    get value() {
        const value = this.viewModel.value;
        return value === null ? this.valueWhenNull : value;
    }

    setValue(value: TValue) {
        this.viewModel.preferredValue = value;
        let selectedIndex = -1;
        if (value) {
            selectedIndex = this.viewModel.items.findIndex(item => this.isMatch(item.value, value!));
        }
        if (selectedIndex < 0) {
            value = this.valueWhenNull;
        }
        this.viewModel.selectedIndex = new SelectedIndexValue(selectedIndex, false);
        this.viewModel.value = value;
    }

    private onValueChangedFromUI() {
        const selectedIndex = this.view.getSelectedIndex();
        if (this.view.elementExists) {
            let value = this.valueWhenNull;
            if (selectedIndex > -1) {
                const item = this.getItems()[selectedIndex];
                if (item) {
                    value = item.value;
                }
            }
            this.viewModel.selectedIndex = new SelectedIndexValue(selectedIndex, true);
            this.viewModel.value = value;
            this.viewModel.preferredValue = value;
        }
    }

    private handleItemsChanged(evt: CustomEvent<ChangedObservableArray<BaseOptionComponentViewModel<TValue>>[]>) {
        this._itemChanges.push(...evt.detail);
        this.debouncedHandleItemsChanged.execute();
    }

    private readonly debouncedHandleItemsChanged = new DebouncedAction(
        this.handleStoredItemChanges.bind(this),
        MvvmOptions.value.debouncedViewModelChangedWait
    );

    private handleStoredItemChanges() {
        const changes = this._itemChanges.splice(0, this._itemChanges.length);
        const itemComponents = this._itemComponents;
        for (const change of changes) {
            if (change.action === "insert") {
                this.insertItemComponent(change.item, change.index);
            }
            else if (change.action === "move") {
                const itemComponent = itemComponents.get(change.item);
                itemComponent?.moveTo(change.index);
            }
            else if (change.action === "remove") {
                this.removeItemComponent(change.item);
            }
        }
        this.selectPreferredValue();
    }

    protected handleChanges(changes: ObservableChanges<BaseSelectComponentViewModel<TValue>>) {
        super.handleChanges(changes);
        const value = Reflect.get(changes, "value") as ChangedProperty<TValue> | undefined;
        if (value) {
            this.registeredEvents.events.valueChanged.invoke(value.value);
        }
    }

    private insertItemComponent(itemVM: BaseOptionComponentViewModel<TValue>, index: number) {
        const itemView = this.view.createItem();
        const itemComponent = new OptionComponent(itemVM, itemView);
        this._itemComponents.set(itemVM, itemComponent);
        this.insertComponent(itemComponent, index);
        this.view.insertItem(itemView, index);
        return itemComponent;
    }

    private removeItemComponent(itemVM: BaseOptionComponentViewModel<TValue>) {
        const itemComponent = this._itemComponents.get(itemVM);
        if (itemComponent) {
            this.removeComponent(itemComponent);
        }
        this._itemComponents.delete(itemVM);
    }

    getItems() {
        return this.getChildComponents() as OptionComponent<TValue>[];
    }

    addItem(sourceItem: TValue) {
        this.addItems(sourceItem);
    }

    addItems(...sourceItems: TValue[]) {
        const itemViewModels = sourceItems.map(item => this.createItemViewModel(item));
        this.viewModel.items.push(...itemViewModels);
    }

    insertItem(index: number, sourceItem: TValue) {
        this.insertItems(index, sourceItem);
    }

    insertItems(index: number, ...sourceItems: TValue[]) {
        const itemViewModels = sourceItems.map(item => this.createItemViewModel(item));
        this.viewModel.items.splice(index, 0, ...itemViewModels);
    }

    removeAllItems() {
        this.viewModel.items.splice(0, this.viewModel.items.length);
    }

    setItems(...sourceItems: TValue[]) {
        if (sourceItems.length > 0) {
            const originalItemViewModels = Array.from(this._itemComponents.keys());
            const itemViewModels: BaseOptionComponentViewModel<TValue>[] = [];
            for (const sourceItem of sourceItems) {
                let itemViewModel = originalItemViewModels.find(
                    vm => this.isMatch(sourceItem, vm.value)
                );
                if (itemViewModel) {
                    this.updateItemViewModel(itemViewModel, sourceItem);
                }
                else {
                    itemViewModel = this.createItemViewModel(sourceItem);
                }
                itemViewModels.push(itemViewModel);
            }
            this.viewModel.items.replaceWith(...itemViewModels);
        }
        else {
            this.viewModel.items.splice(0, this.viewModel.items.length);
        }
    }

    addOrUpdateItems(...sourceItems: TValue[]) {
        const originalItemViewModels = Array.from(this._itemComponents.keys());
        const itemViewModels: BaseOptionComponentViewModel<TValue>[] = [];
        itemViewModels.push(...originalItemViewModels);
        for (const sourceItem of sourceItems) {
            let itemViewModel = originalItemViewModels.find(
                vm => this.isMatch(sourceItem, vm.value)
            );
            if (itemViewModel) {
                this.updateItemViewModel(itemViewModel, sourceItem);
            }
            else {
                itemViewModel = this.createItemViewModel(sourceItem);
                itemViewModels.push(itemViewModel);
            }
        }
        this.viewModel.items.replaceWith(...itemViewModels);
    }

    private createItemViewModel(sourceItem: TValue) {
        const itemViewModel = this.viewModel.createItem(sourceItem);
        this.updateItemViewModel(itemViewModel, sourceItem);
        return itemViewModel;
    }

    private updateItemViewModel(itemViewModel: BaseOptionComponentViewModel<TValue>, sourceItem: TValue) {
        itemViewModel.formattedValue = this.formatValue(sourceItem);
        itemViewModel.text = this.formatText(sourceItem);
    }

    private selectPreferredValue() {
        let value = this.viewModel.preferredValue;
        const selectedIndex = value ?
            this.getItems().findIndex(item => this.isMatch(item.value, value!)) :
            -1;
        if (selectedIndex < 0) {
            value = this.valueWhenNull;
        }
        this.viewModel.selectedIndex = new SelectedIndexValue(selectedIndex, false);
        this.viewModel.value = value;
    }

    immediateHandleChanges() {
        this.handleStoredItemChanges();
        this.viewModel.items.immediateHandleChanges();
        super.immediateHandleChanges();
    }

    dispose() {
        this.viewModel.items.when.arrayChanged?.unregister(this.handleItemsChanged.bind(this));
        this.debouncedHandleItemsChanged.cancel();
        this.handleStoredItemChanges();
        this.viewModel.items.immediateHandleChanges();
        super.dispose();
    }
}
