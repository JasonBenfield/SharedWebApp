import { DebouncedAction } from "../DebouncedAction";
import { Component } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { CustomEventRegistrations } from "./EventManager";
import { MvvmOptions } from "./MvvmOptions";
import { ChangedObservableArray, ChangedObservableArrayItem, ObservableArray } from "./ObservableArray";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentViewModel } from "./TextComponent";
import { Constructor } from "./Types";

export interface IListViewModel<TItemViewModel extends ComponentViewModel> {
    readonly items: ObservableArray<TItemViewModel>;
}

export type BaseListComponentViewModel<TItemViewModel extends ComponentViewModel> = ComponentViewModel & IListViewModel<TItemViewModel>;

export class ListComponentViewModel<TItemViewModel extends ComponentViewModel>
    extends ComponentViewModel
    implements IListViewModel<TItemViewModel> {
    readonly items = new ObservableArray<TItemViewModel>();
}

export interface IViewModelUpdater<TSource, TItemViewModel> {
    isMatch(source: TSource, viewModel: TItemViewModel): boolean;
    updateFrom(source: TSource, viewModel: TItemViewModel): void;
}

type ListViewEventLayout = {
    clicked: PointerEvent;
}

export interface IListView {
    readonly whenList: CustomEventRegistrations<ListViewEventLayout>;
    addItem(item: ComponentView): void;
    insertItem(item: ComponentView, index: number): void;
    removeItem(item: ComponentView): void;
}

export function ListViewMixin<T extends Constructor<ComponentView>>(Base: T) {
    return class extends Base implements IListView {

        private readonly listEvents = this.eventManager.addEvents<ListViewEventLayout>({
            clicked: null
        });
        get whenList() {
            if (!this.hasRegisteredListEvents) {
                this.setEventListener(
                    "click",
                    this.handleClickEvent.bind(this) as any
                );
                this.hasRegisteredListEvents = true;
            }
            return this.listEvents.when;
        }

        private hasRegisteredListEvents = false;

        private handleClickEvent(evt: PointerEvent) {
            this.listEvents.events.clicked.invoke(evt);
        }

        getItems() { return this.getChildViews(); }

        addItem(view: ComponentView) {
            this.addChildView(view);
        }

        insertItem(view: ComponentView, index: number) {
            this.insertChildView(view, index);
        }

        removeItem(view: ComponentView) {
            this.removeChildView(view);
        }
    };
}

export class ListComponentView extends ListViewMixin(StyleableComponentViewMixin(ComponentView)) {
    static unorderedList() {
        return new ListComponentView("ul");
    }

    static block() {
        return new ListComponentView("div");
    }

}

export class TextViewModelUpdater<TViewModel extends BaseTextComponentViewModel> implements IViewModelUpdater<string, TViewModel> {
    isMatch() {
        return false;
    }

    updateFrom(source: string, vm: TViewModel) {
        vm.text = source;
    }
}

export type BaseListView = ComponentView & IListView;

export interface IListComponentOptions<TSource, THeaderComponent extends Component, TItemComponent extends Component, TFooterComponent extends Component> {
    viewModel: BaseListComponentViewModel<ComponentViewModel>;
    view: BaseListView;
    headerFactory: IListItemFactory<THeaderComponent>;
    isHeaderVisibilityAutomated: boolean;
    itemFactory: IListItemFactory<TItemComponent>;
    footerFactory: IListItemFactory<TFooterComponent>;
    isFooterVisibilityAutomated: boolean;
    itemUpdater: IViewModelUpdater<TSource, ComponentViewModel>;
}

function createDefaultListItemFactory() {
    return new ListItemFactory(() => new ComponentViewModel())
        .withView(() => new ComponentView())
        .withComponent((itemVM, itemView) => new Component(itemVM, itemView))
        .build()
}

export class ListComponentOptionsBuilder<TItemViewModel extends ComponentViewModel, TListView extends BaseListView> {

    constructor(private readonly viewModel: BaseListComponentViewModel<TItemViewModel>, private readonly view: TListView) {
    }

    withHeaderFactory<THeaderViewModel extends ComponentViewModel, THeaderView extends ComponentView, THeaderComponent extends Component>(createHeaderFactory: () => ListItemFactoryForComponent<THeaderViewModel, THeaderView, THeaderComponent>) {
        const headerFactory = createHeaderFactory().build();
        const footerFactory = createDefaultListItemFactory();
        return new ListComponentOptionsBuilderFromHeaderFactory(this.viewModel, this.view, headerFactory, true, footerFactory, false);
    }

    withFooterFactory<TFooterViewModel extends ComponentViewModel, TFooterView extends ComponentView, TFooterComponent extends Component>(createFooterFactory: () => ListItemFactoryForComponent<TFooterViewModel, TFooterView, TFooterComponent>) {
        const headerFactory = createDefaultListItemFactory();
        const footerFactory = createFooterFactory().build();
        return new ListComponentOptionsBuilderFromHeaderFactory(this.viewModel, this.view, headerFactory, false, footerFactory, true);
    }

    withItemFactory<TItemView extends ComponentView, TItemComponent extends Component>(createItemFactory: () => ListItemFactoryForComponent<TItemViewModel, TItemView, TItemComponent>) {
        const itemFactory = createItemFactory().build();
        const headerFactory = createDefaultListItemFactory();
        const footerFactory = createDefaultListItemFactory();
        return new ListComponentOptionsBuilderFromItemFactory(this.viewModel, this.view, itemFactory, headerFactory, false, footerFactory, false);
    }

}

export class ListComponentOptionsBuilderFromHeaderFactory<TItemViewModel extends ComponentViewModel, THeaderComponent extends Component, TFooterComponent extends Component> {
    constructor(
        private readonly viewModel: BaseListComponentViewModel<TItemViewModel>,
        private readonly view: BaseListView,
        private readonly headerFactory: IListItemFactory<THeaderComponent>,
        private isHeaderVisibilityAutomated: boolean,
        private readonly footerFactory: IListItemFactory<TFooterComponent>,
        private isFooterVisibilityAutomated: boolean
    ) {
    }

    withFooterFactory<TFooterViewModel extends ComponentViewModel, TFooterView extends ComponentView, TFooterComponent extends Component>(createFooterFactory: () => ListItemFactoryForComponent<TFooterViewModel, TFooterView, TFooterComponent>) {
        const footerFactory = createFooterFactory().build();
        return new ListComponentOptionsBuilderFromFooterFactory(this.viewModel, this.view, this.headerFactory, this.isHeaderVisibilityAutomated, footerFactory, true);
    }

    withItemFactory<TItemView extends ComponentView, TItemComponent extends Component>(createItemFactory: () => ListItemFactoryForComponent<TItemViewModel, TItemView, TItemComponent>) {
        const itemFactory = createItemFactory().build();
        return new ListComponentOptionsBuilderFromItemFactory(this.viewModel, this.view, itemFactory, this.headerFactory, this.isHeaderVisibilityAutomated, this.footerFactory, this.isFooterVisibilityAutomated);
    }
}

export class ListComponentOptionsBuilderFromFooterFactory<TItemViewModel extends ComponentViewModel, THeaderComponent extends Component, TFooterComponent extends Component> {
    constructor(
        private readonly viewModel: BaseListComponentViewModel<TItemViewModel>,
        private readonly view: BaseListView,
        private readonly headerFactory: IListItemFactory<THeaderComponent>,
        private isHeaderVisibilityAutomated: boolean,
        private readonly footerFactory: IListItemFactory<TFooterComponent>,
        private isFooterVisibilityAutomated: boolean
    ) {
    }

    withHeaderFactory<THeaderView extends ComponentView, THeaderComponent extends Component>(createHeaderFactory: () => ListItemFactoryForComponent<TItemViewModel, THeaderView, THeaderComponent>) {
        const headerFactory = createHeaderFactory().build();
        return new ListComponentOptionsBuilderFromHeaderFactory(this.viewModel, this.view, headerFactory, true, this.footerFactory, this.isFooterVisibilityAutomated);
    }

    withItemFactory<TItemView extends ComponentView, TItemComponent extends Component>(createItemFactory: () => ListItemFactoryForComponent<TItemViewModel, TItemView, TItemComponent>) {
        const itemFactory = createItemFactory().build();
        return new ListComponentOptionsBuilderFromItemFactory(this.viewModel, this.view, itemFactory, this.headerFactory, this.isHeaderVisibilityAutomated, this.footerFactory, this.isFooterVisibilityAutomated);
    }
}

export class ListComponentOptionsBuilderFromItemFactory<TItemViewModel extends ComponentViewModel, THeaderComponent extends Component, TItemComponent extends Component, TFooterComponent extends Component> {
    constructor(
        private readonly viewModel: BaseListComponentViewModel<TItemViewModel>,
        private readonly view: BaseListView,
        private readonly itemFactory: IListItemFactory<TItemComponent>,
        private readonly headerFactory: IListItemFactory<THeaderComponent>,
        private readonly isHeaderVisibilityAutomated: boolean,
        private readonly footerFactory: IListItemFactory<TFooterComponent>,
        private readonly isFooterVisibilityAutomated: boolean
    ) {
    }

    build<TSource>(itemUpdater: IViewModelUpdater<TSource, TItemViewModel>) {
        const viewModel: any = this.viewModel;
        const options: IListComponentOptions<TSource, THeaderComponent, TItemComponent, TFooterComponent> = {
            viewModel: viewModel,
            view: this.view,
            headerFactory: this.headerFactory,
            isHeaderVisibilityAutomated: this.isHeaderVisibilityAutomated,
            itemFactory: this.itemFactory,
            footerFactory: this.footerFactory,
            isFooterVisibilityAutomated: this.isFooterVisibilityAutomated,
            itemUpdater: itemUpdater
        };
        return options;
    }
}

export class ListComponentItemClickedEventArgs<TItemComponent extends Component> {
    constructor(readonly listItem: TItemComponent, readonly source: Component) {
    }
}

type ListComponentEventLayout<TItemComponent extends Component> = {
    itemClicked: ListComponentItemClickedEventArgs<TItemComponent>;
}

export class ListComponent<TSource, THeaderComponent extends Component, TItemComponent extends Component, TFooterComponent extends Component> extends Component {
    declare protected readonly viewModel: BaseListComponentViewModel<ComponentViewModel>;
    protected readonly view: BaseListView;
    private readonly itemFactory: IListItemFactory<TItemComponent>;
    private readonly itemUpdater: IViewModelUpdater<TSource, ComponentViewModel>;
    private readonly _itemChanges: ChangedObservableArray<ComponentViewModel>[] = [];
    private readonly _itemComponents: Map<ComponentViewModel, TItemComponent> = new Map();
    private readonly events = this.eventManager.addEvents<ListComponentEventLayout<TItemComponent>>({
        itemClicked: null
    });
    get when() {
        if (!this.hasRegisteredListEvents) {
            this.view.whenList.clicked.then(this.onListClicked.bind(this));
            this.hasRegisteredListEvents = true;
        }
        return this.events.when;
    }

    private onListClicked(evt: CustomEventInit<PointerEvent>) {
        
    }

    private hasRegisteredListEvents = false;

    readonly header: THeaderComponent;
    private isHeaderVisibilityAutomated: boolean;
    readonly footer: TFooterComponent;
    private isFooterVisibilityAutomated: boolean;
    private hasRegisteredItemPropertyChanged = false;

    constructor(options: IListComponentOptions<TSource, THeaderComponent, TItemComponent, TFooterComponent>) {
        const viewModel = options.viewModel;
        const view = options.view;
        super(viewModel, view);
        this.view = view;
        this.itemFactory = options.itemFactory;
        this.itemUpdater = options.itemUpdater;
        this.isHeaderVisibilityAutomated = options.isHeaderVisibilityAutomated;
        this.isFooterVisibilityAutomated = options.isFooterVisibilityAutomated;
        const headerFactory = options.headerFactory;
        const headerViewModel = headerFactory.createItemViewModel();
        const headerView = headerFactory.createItemView(headerViewModel);
        view.addItem(headerView);
        this.header = this.addComponent(headerFactory.createItemComponent(headerViewModel, headerView));
        if (this.isHeaderVisibilityAutomated && viewModel.items.length > 0) {
            this.header.show();
        }
        else {
            this.header.hide();
        }
        let i = 1;
        for (const itemVM of viewModel.items.getValues()) {
            this.insertItemComponent(itemVM, i);
            i++;
        }
        const footerFactory = options.footerFactory;
        const footerViewModel = footerFactory.createItemViewModel();
        const footerView = footerFactory.createItemView(footerViewModel);
        view.addItem(footerView);
        this.footer = this.addComponent(footerFactory.createItemComponent(footerViewModel, footerView));
        if (this.isFooterVisibilityAutomated && viewModel.items.length > 0) {
            this.footer.show();
        }
        else {
            this.footer.hide();
        }
        viewModel.items.when.arrayChanged.then(this.handleItemsChanged.bind(this));
        this.registerArrayItemChanged();
    }

    private registerArrayItemChanged() {
        if (!this.hasRegisteredItemPropertyChanged && (this.isHeaderVisibilityAutomated || this.isFooterVisibilityAutomated)) {
            this.viewModel.items.when.arrayItemChanged.then(this.handleArrayItemChanged.bind(this));
            this.hasRegisteredItemPropertyChanged = true;
        }
    }

    private handleArrayItemChanged(evt: CustomEvent<ChangedObservableArrayItem<ComponentViewModel>[]>) {
        if (evt.detail.find(c => c.changes.isVisible)) {
            this.updateHeaderAndFooterVisibility();
        }
    }

    private handleItemsChanged(evt: CustomEvent<ChangedObservableArray<ComponentViewModel>[]>) {
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
            const index = change.index + 1;
            if (change.action === "add" || change.action === "insert") {
                this.insertItemComponent(change.item, index);
            }
            else if (change.action === "move") {
                const itemComponent = itemComponents.get(change.item);
                itemComponent?.moveTo(index);
            }
            else if (change.action === "remove") {
                this.removeItemComponent(change.item);
            }
        }
    }

    automateHeaderVisibility() {
        this.isHeaderVisibilityAutomated = true;
        this.registerArrayItemChanged();
    }

    manualHeaderVisibility() {
        this.isHeaderVisibilityAutomated = false;
    }

    automateFooterVisibility() {
        this.isFooterVisibilityAutomated = true;
        this.registerArrayItemChanged();
    }

    manualFooterVisibility() {
        this.isFooterVisibilityAutomated = false;
    }

    private insertItemComponent(itemVM: ComponentViewModel, index: number) {
        const itemView = this.itemFactory.createItemView(itemVM);
        const itemComponent = this.itemFactory.createItemComponent(itemVM, itemView);
        this._itemComponents.set(itemVM, itemComponent);
        this.insertComponent(itemComponent, index);
        this.view.insertItem(itemView, index);
        return itemComponent;
    }

    private removeItemComponent(itemVM: ComponentViewModel) {
        const itemComponent = this._itemComponents.get(itemVM);
        if (itemComponent) {
            this.removeComponent(itemComponent);
            this._itemComponents.delete(itemVM);
        }
    }

    getItems() {
        return this.getChildComponents().filter(c => c !== this.header && c !== this.footer) as TItemComponent[];
    }

    addItem(sourceItem: TSource) {
        this.addItems(sourceItem);
    }

    addItems(...sourceItems: TSource[]) {
        const itemViewModels = sourceItems.map(item => this.createItemViewModel(item));
        this.viewModel.items.push(...itemViewModels);
        this.updateHeaderAndFooterVisibility();
    }

    removeAllItems() {
        this.viewModel.items.splice(0, this.viewModel.items.length);
        this.updateHeaderAndFooterVisibility();
    }

    setItems(...sourceItems: TSource[]) {
        if (sourceItems.length > 0) {
            const originalItemViewModels = Array.from(this._itemComponents.keys());
            const itemViewModels: ComponentViewModel[] = [];
            for (const sourceItem of sourceItems) {
                let itemViewModel = originalItemViewModels.find(vm => this.itemUpdater.isMatch(sourceItem, vm));
                if (!itemViewModel) {
                    itemViewModel = this.createItemViewModel(sourceItem);
                }
                this.itemUpdater.updateFrom(sourceItem, itemViewModel);
                itemViewModels.push(itemViewModel);
            }
            this.viewModel.items.replaceWith(...itemViewModels);
        }
        else {
            this.viewModel.items.splice(0, this.viewModel.items.length);
        }
        this.updateHeaderAndFooterVisibility();
    }

    addOrUpdateItems(...sourceItems: TSource[]) {
        const originalItemViewModels = Array.from(this._itemComponents.keys());
        const itemViewModels: ComponentViewModel[] = [];
        itemViewModels.push(...originalItemViewModels);
        for (const sourceItem of sourceItems) {
            let itemViewModel = originalItemViewModels.find(vm => this.itemUpdater.isMatch(sourceItem, vm));
            if (!itemViewModel) {
                itemViewModel = this.createItemViewModel(sourceItem);
                itemViewModels.push(itemViewModel);
            }
            this.itemUpdater.updateFrom(sourceItem, itemViewModel);
        }
        this.viewModel.items.replaceWith(...itemViewModels);
        this.updateHeaderAndFooterVisibility();
    }

    private createItemViewModel(sourceItem: TSource) {
        const itemViewModel = this.itemFactory.createItemViewModel();
        this.itemUpdater.updateFrom(sourceItem, itemViewModel);
        return itemViewModel;
    }

    private updateHeaderAndFooterVisibility() {
        if (this.isHeaderVisibilityAutomated || this.isFooterVisibilityAutomated) {
            if (this.viewModel.items.getValues().find(item => item.isVisible)) {
                if (this.isHeaderVisibilityAutomated) {
                    this.header.show();
                }
                if (this.isFooterVisibilityAutomated) {
                    this.footer.show();
                }
            }
            else {
                if (this.isHeaderVisibilityAutomated) {
                    this.header.hide();
                }
                if (this.isFooterVisibilityAutomated) {
                    this.footer.hide();
                }
            }
        }
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

export interface IListItemFactory<TComponent extends Component> {
    createItemViewModel(): ComponentViewModel;
    createItemView(viewModel: ComponentViewModel): ComponentView;
    createItemComponent(viewModel: ComponentViewModel, view: ComponentView): TComponent;
}

export class ListItemFactory<TItemViewModel extends ComponentViewModel> {
    constructor(private readonly createItemViewModel: () => TItemViewModel) {
    }

    withView<TItemView extends ComponentView>(createItemView: (viewModel: TItemViewModel) => TItemView) {
        return new ListItemFactoryForView<TItemViewModel, TItemView>(this.createItemViewModel, createItemView);
    }
}

export class ListItemFactoryForView<TItemViewModel extends ComponentViewModel, TItemView extends ComponentView> {
    constructor(
        private readonly createItemViewModel: () => TItemViewModel,
        private readonly createItemView: (viewModel: TItemViewModel) => TItemView
    ) {
    }

    withComponent<TItemComponent extends Component>(createItemComponent: (viewModel: TItemViewModel, view: TItemView) => TItemComponent) {
        return new ListItemFactoryForComponent(
            this.createItemViewModel,
            this.createItemView,
            createItemComponent
        );
    }
}

export class ListItemFactoryForComponent<TItemViewModel extends ComponentViewModel, TItemView extends ComponentView, TItemComponent extends Component> {
    constructor(
        private readonly createItemViewModel: () => TItemViewModel,
        private readonly createItemView: (viewModel: TItemViewModel) => TItemView,
        private readonly createItemComponent: (viewModel: TItemViewModel, view: TItemView) => TItemComponent
    ) {
    }

    build() {
        const factory: IListItemFactory<TItemComponent> = {
            createItemViewModel: this.createItemViewModel,
            createItemView: this.createItemView,
            createItemComponent: this.createItemComponent
        };
        return factory;
    }
}
