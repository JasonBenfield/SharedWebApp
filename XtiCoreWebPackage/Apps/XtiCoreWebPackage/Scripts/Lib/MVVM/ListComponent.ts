import { DebouncedAction } from "../DebouncedAction";
import { Component } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { MvvmPage } from "./MvvmPage";
import { ObservableArray, ObservableArrayChange } from "./ObservableArray";
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

export interface IListView {
    createItemElement(): HTMLElement;
    addItem(item: ComponentView): void;
    insertItem(item: ComponentView, index: number): void;
    removeItem(item: ComponentView): void;
}

export function ListViewMixin<T extends Constructor<ComponentView>>(Base: T) {
    return class extends Base implements IListView {
        protected itemTagName: string = "";

        createItemElement() {
            return document.createElement(this.itemTagName);
        }

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
        return new ListComponentView("ul", "li");
    }

    static create(itemTagName: "div" | "a") {
        return new ListComponentView("div", itemTagName);
    }

    constructor(listTagName: string, itemTagName: string) {
        super(listTagName);
        this.itemTagName = itemTagName;
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
        .withView((createItemElement) => new ComponentView(createItemElement))
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

export class ListComponent<TSource, THeaderComponent extends Component, TItemComponent extends Component, TFooterComponent extends Component> extends Component {
    declare protected readonly viewModel: BaseListComponentViewModel<ComponentViewModel>;
    declare protected readonly view: BaseListView;
    private readonly itemFactory: IListItemFactory<TItemComponent>;
    private readonly itemUpdater: IViewModelUpdater<TSource, ComponentViewModel>;
    private readonly _itemChanges: ObservableArrayChange<ComponentViewModel>[] = [];
    private readonly _itemComponents: Map<ComponentViewModel, TItemComponent> = new Map();

    readonly header: THeaderComponent;
    private isHeaderVisibilityAutomated: boolean;
    readonly footer: TFooterComponent;
    private isFooterVisibilityAutomated: boolean;

    constructor(options: IListComponentOptions<TSource, THeaderComponent, TItemComponent, TFooterComponent>) {
        super(options.viewModel, options.view);
        this.itemFactory = options.itemFactory;
        this.itemUpdater = options.itemUpdater;
        this.isHeaderVisibilityAutomated = options.isHeaderVisibilityAutomated;
        this.isFooterVisibilityAutomated = options.isFooterVisibilityAutomated;
        const headerViewModel = options.headerFactory.createItemViewModel();
        const headerView = options.headerFactory.createItemView(options.view.createItemElement.bind(options.view), headerViewModel);
        options.view.addItem(headerView);
        this.header = this.addComponent(options.headerFactory.createItemComponent(headerViewModel, headerView));
        if (this.isHeaderVisibilityAutomated && options.viewModel.items.length > 0) {
            this.header.show();
        }
        else {
            this.header.hide();
        }
        let i = 1;
        for (const itemVM of options.viewModel.items.getValues()) {
            this.insertItemComponent(itemVM, i);
            i++;
        }
        const footerViewModel = options.footerFactory.createItemViewModel();
        const footerView = options.footerFactory.createItemView(options.view.createItemElement.bind(options.view), footerViewModel);
        options.view.addItem(footerView);
        this.footer = this.addComponent(options.footerFactory.createItemComponent(footerViewModel, footerView));
        if (this.isFooterVisibilityAutomated && options.viewModel.items.length > 0) {
            this.footer.show();
        }
        else {
            this.footer.hide();
        }
        options.viewModel.items.when.arrayChanged.then(this.handleItemsChanged.bind(this));
    }

    private handleItemsChanged(evt: CustomEvent<ObservableArrayChange<ComponentViewModel>[]>) {
        this._itemChanges.push(...evt.detail);
        this.debouncedHandleItemsChanged.execute();
    }

    private readonly debouncedHandleItemsChanged = new DebouncedAction(
        () => {
            const changes = this._itemChanges.map(c => c);
            this._itemChanges.splice(0, this._itemChanges.length);
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
        },
        MvvmPage.get().options.debouncedViewModelChangedWait
    );

    automateHeaderVisibility() {
        this.isHeaderVisibilityAutomated = true;
    }

    manualHeaderVisibility() {
        this.isHeaderVisibilityAutomated = false;
    }

    automateFooterVisibility() {
        this.isFooterVisibilityAutomated = true;
    }

    manualFooterVisibility() {
        this.isFooterVisibilityAutomated = false;
    }

    private insertItemComponent(itemVM: ComponentViewModel, index: number) {
        const itemView = this.itemFactory.createItemView(this.view.createItemElement.bind(this.view), itemVM);
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

    addItem(sourceItem: TSource) {
        this.addItems(sourceItem);
    }

    addItems(...sourceItems: TSource[]) {
        const itemViewModels = sourceItems.map(item => this.createItemViewModel(item));
        this.viewModel.items.push(...itemViewModels);
        this.updateHeaderVisibility();
    }

    removeAllItems() {
        this.viewModel.items.splice(0, this.viewModel.items.length);
        this.updateHeaderVisibility();
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
        this.updateHeaderVisibility();
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
        this.updateHeaderVisibility();
    }

    private createItemViewModel(sourceItem: TSource) {
        let itemViewModel = this.itemFactory.createItemViewModel();
        this.itemUpdater.updateFrom(sourceItem, itemViewModel);
        return itemViewModel;
    }

    private updateHeaderVisibility() {
        if (this.viewModel.items.length > 0) {
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

export interface IListItemFactory<TComponent extends Component> {
    createItemViewModel(): ComponentViewModel;
    createItemView(createItemElement: () => HTMLElement, viewModel: ComponentViewModel): ComponentView;
    createItemComponent(viewModel: ComponentViewModel, view: ComponentView): TComponent;
}

export class ListItemFactory<TItemViewModel extends ComponentViewModel> {
    constructor(private readonly createItemViewModel: () => TItemViewModel) {
    }

    withView<TItemView extends ComponentView>(createItemView: (createItemElement: () => HTMLElement, viewModel: TItemViewModel) => TItemView) {
        return new ListItemFactoryForView<TItemViewModel, TItemView>(this.createItemViewModel, createItemView);
    }
}

export class ListItemFactoryForView<TItemViewModel extends ComponentViewModel, TItemView extends ComponentView> {
    constructor(
        private readonly createItemViewModel: () => TItemViewModel,
        private readonly createItemView: (createItemElement: () => HTMLElement, viewModel: TItemViewModel) => TItemView
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
        private readonly createItemView: (createItemElement: () => HTMLElement, viewModel: TItemViewModel) => TItemView,
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