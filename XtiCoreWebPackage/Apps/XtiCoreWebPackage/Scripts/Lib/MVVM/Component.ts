import { DebouncedAction } from "../DebouncedAction";
import { ComponentView } from "./ComponentView";
import { ChangedProperty, ComponentViewModel, ObservableChanges, UpdatedViewModel } from "./ComponentViewModel";
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

export class Component {
    private readonly changes: ObservableChanges<ComponentViewModel> & { [name: string]: ChangedProperty; } = {};
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
        this.changeHandlers.push(new ComponentVisibilityChangeHandler(viewModel, this.views));
        for (const changeHandler of changeHandlers) {
            this.changeHandlers.push(changeHandler);
        }
        this.handleChanges(viewModel.changes);
    }

    private onViewModelChanged(event: CustomEvent<UpdatedViewModel>) {
        this.changes[event.detail.changedProperty.propertyName] = event.detail.changedProperty;
        this.debouncedOnViewModelChanged.execute();
    }

    private readonly debouncedOnViewModelChanged = new DebouncedAction(
        this.handleStoredChanges.bind(this),
        MvvmOptions.value.debouncedViewModelChangedWait
    );

    private handleStoredChanges() {
        this.handleChanges(Object.assign({}, this.changes));
        for (const key in this.changes) {
            delete this.changes[key];
        }
    }

    private handleChanges(changes: ObservableChanges<ComponentViewModel>) {
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

    hasView(otherView: ComponentView) {
        return Boolean(this.views.find(v => v === otherView));
    }

    show() {
        this.viewModel.isVisible = true;
    }

    hide() {
        this.viewModel.isVisible = false;
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
        this.handleStoredChanges();
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
    }
}
