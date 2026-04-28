import { DebouncedAction } from "../DebouncedAction";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ObservableChanges, UpdatedViewModel } from "./ComponentViewModel";
import { CurrentScrollIntoView } from "./CurrentScrollIntoView";
import { EventManager } from "./EventManager";
import { MvvmOptions } from "./MvvmOptions";

export abstract class ComponentChangeHandler<TViewModel extends ComponentViewModel, TView extends ComponentView> {
    private readonly views: TView[];

    constructor(viewModel: TViewModel, view: TView);
    constructor(viewModel: TViewModel, views: TView[]);
    constructor(protected readonly viewModel: TViewModel, viewOrViews: TView | (TView[])) {
        if (Array.isArray(viewOrViews)) {
            this.views = viewOrViews;
        }
        else {
            this.views = [viewOrViews];
        }
    }

    abstract handleChanges(changes: ObservableChanges<TViewModel>): void;

    protected updateView(action: (v: TView) => void) {
        for (const view of this.views) {
            action(view);
        }
    }

    protected updateFirstView(action: (v: TView) => void) {
        const view = this.views[0];
        if (view) {
            action(view);
        }
    }
}

export class ComponentVisibilityChangeHandler extends ComponentChangeHandler<ComponentViewModel, ComponentView> {

    handleChanges(changes: ObservableChanges<ComponentViewModel>) {
        if (changes.isVisible) {
            const isVisible = changes.isVisible.value;
            this.updateView(v => {
                if (isVisible) {
                    v.show();
                }
                else {
                    v.hide();
                }
            });
        }
    }
}

export class ComponentScrollIntoViewChangeHandler extends ComponentChangeHandler<ComponentViewModel, ComponentView> {

    handleChanges(changes: ObservableChanges<ComponentViewModel>) {
        if (changes.isScrolledIntoView) {
            const isScrolledIntoView = changes.isScrolledIntoView.value;
            this.updateFirstView(v => {
                if (isScrolledIntoView) {
                    v.scrollIntoView();
                }
                else {
                    v.cancelScrollIntoView();
                }
            });
            CurrentScrollIntoView.value.setCurrent(this.viewModel);
        }
    }
}

export type ComponentLayout<T> = {
    [K in keyof T]: Component;
}

export class Component {
    protected readonly eventManager = new EventManager();
    private readonly changes: ObservableChanges<ComponentViewModel> = {};
    private readonly changeHandlers: ComponentChangeHandler<ComponentViewModel, ComponentView>[] = [];
    private readonly childComponents: Component[] = [];
    private readonly views: ComponentView[];
    private parentComponent: Component | null = null;

    constructor(
        protected readonly viewModel: ComponentViewModel,
        viewOrViews: ComponentView | (ComponentView[]),
        ...changeHandlers: ComponentChangeHandler<typeof viewModel, ComponentView>[]
    ) {
        this.viewModel.when.propertyChanged.then(this.onViewModelChanged.bind(this));
        if (Array.isArray(viewOrViews)) {
            this.views = viewOrViews;
        }
        else {
            this.views = [viewOrViews];
        }
        this.changeHandlers.push(
            new ComponentVisibilityChangeHandler(viewModel, this.views),
            new ComponentScrollIntoViewChangeHandler(viewModel, this.views)
        );
        for (const changeHandler of changeHandlers) {
            this.changeHandlers.push(changeHandler);
        }
        this.handleChanges(viewModel.changes);
    }

    private onViewModelChanged(event: CustomEvent<UpdatedViewModel<typeof this.viewModel>>) {
        Reflect.set(this.changes, event.detail.changedProperty.propertyName, event.detail.changedProperty);
        this.debouncedOnViewModelChanged.execute();
    }

    private readonly debouncedOnViewModelChanged = new DebouncedAction(
        this.handleStoredChanges.bind(this),
        MvvmOptions.value.debouncedViewModelChangedWait
    );

    private handleStoredChanges() {
        const storedChanges = Object.assign({}, this.changes);
        for (const key in this.changes) {
            Reflect.deleteProperty(this.changes, key);
        }
        this.handleChanges(storedChanges);
    }

    protected handleChanges(changes: ObservableChanges<typeof this.viewModel>) {
        for (const handler of this.changeHandlers) {
            handler.handleChanges(changes);
        }
    }

    protected getChildComponents() {
        return Array.from(this.childComponents);
    }

    hasViewModel(otherViewModel: ComponentViewModel) {
        return this.viewModel === otherViewModel;
    }

    protected addView(view: ComponentView) {
        this.views.push(view);
        return view;
    }

    hasView(otherView: ComponentView) {
        return Boolean(this.views.find(v => v === otherView));
    }

    show() {
        this.viewModel.isVisible = true;
    }

    hide() {
        this.viewModel.isVisible = false;
    }

    scrollIntoView() {
        this.viewModel.isScrolledIntoView = true;
    }

    containsElement(otherEl: HTMLElement) {
        let result = false;
        let i = 0;
        while (!result && i < this.views.length) {
            const view = this.views[i];
            result = view.elementEquals(otherEl) || view.containsElement(otherEl);
            i++;
        }
        return result;
    }

    findComponentFromElement(otherEl: HTMLElement): Component | null {
        let foundComponent: Component | null = null;
        let i = 0;
        while (!foundComponent && i < this.views.length) {
            const view = this.views[i];
            if (view.elementEquals(otherEl)) {
                foundComponent = this;
            }
            else if (view.containsElement(otherEl)) {
                foundComponent = this.findChildComponentFromElement(otherEl);
                if (!foundComponent) {
                    foundComponent = this;
                }
            }
            i++;
        }
        return foundComponent;
    }

    private findChildComponentFromElement(otherEl: HTMLElement): Component | null {
        let foundComponent: Component | null = null;
        let i = 0;
        while (!foundComponent && i < this.childComponents.length) {
            const childComponent = this.childComponents[i];
            foundComponent = childComponent.findComponentFromElement(otherEl);
            i++;
        }
        return foundComponent;
    }

    protected addLayout<TLayout extends ComponentLayout<TLayout>>(layout: TLayout) {
        for (const key in layout) {
            const component = layout[key];
            this.addComponent(component);
        }
        return layout;
    }

    protected addComponent<TComponent extends Component>(c: TComponent) {
        if (Object.is(this, c)) {
            throw new Error("cannot add component to itself");
        }
        c.parentComponent = this;
        this.childComponents.push(c);
        return c;
    }

    protected insertComponent<TComponent extends Component>(c: TComponent, index: number) {
        if (Object.is(this, c)) {
            throw new Error("cannot add component to itself");
        }
        c.parentComponent = this;
        this.childComponents.splice(index, 0, c);
        return c;
    }

    protected removeComponent(c: Component) {
        const index = this.childComponents.indexOf(c);
        if (index >= 0) {
            this.childComponents.splice(index, 1);
            c.dispose();
        }
        return c;
    }

    moveTo(toIndex: number) {
        const parent = this.parentComponent;
        if (parent) {
            parent.moveComponent(this, toIndex);
            for (const view of this.views) {
                view.moveTo(toIndex);
            }
        }
    }

    private moveComponent(c: Component, toIndex: number) {
        if (Object.is(this, c)) {
            throw new Error("cannot move itself");
        }
        const index = this.childComponents.indexOf(c);
        if (index > -1) {
            this.childComponents.splice(index, 1);
            if (toIndex > index) {
                toIndex--;
            }
            this.childComponents.splice(toIndex, 0, c);
        }
    }

    immediateHandleChanges() {
        for (const childComponent of this.childComponents) {
            childComponent.immediateHandleChanges();
        }
        let i = 0;
        while (i < 5 && Object.keys(this.changes).length > 0) {
            this.handleStoredChanges();
            i++;
        }
    }

    dispose() {
        this.viewModel.when.propertyChanged?.unregister(this.onViewModelChanged.bind(this));
        this.debouncedOnViewModelChanged.cancel();
        this.hide();
        const childComponents = this.childComponents.splice(0, this.childComponents.length);
        for (const childComponent of childComponents) {
            childComponent.dispose();
        }
        this.handleStoredChanges();
        this.viewModel.dispose();
        const views = this.views.splice(0, this.views.length);
        for (const view of views) {
            view.dispose();
        }
        this.eventManager.dispose();
    }
}