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
    private readonly _changes: ObservableChanges<ComponentViewModel> & { [name: string]: ChangedProperty; } = {};
    private readonly _changeHandlers: ComponentChangeHandler<ComponentViewModel, ComponentView>[] = [];
    private readonly _components: Component[] = [];
    private readonly views: ComponentView[];
    private _parent: Component | null = null;

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
        this._changeHandlers.push(new ComponentVisibilityChangeHandler(viewModel, this.views));
        for (const changeHandler of changeHandlers) {
            this._changeHandlers.push(changeHandler);
        }
        this.handleChanges(viewModel.changes);
    }

    private onViewModelChanged(event: CustomEvent<UpdatedViewModel>) {
        this._changes[event.detail.changedProperty.propertyName] = event.detail.changedProperty;
        this.debouncedOnViewModelChanged.execute();
    }

    private readonly debouncedOnViewModelChanged = new DebouncedAction(
        () => {
            const changes = this._changes;
            if (changes) {
                this.handleChanges(changes);
                for (const key in changes) {
                    delete changes[key];
                }
            }
        },
        MvvmOptions.value.debouncedViewModelChangedWait
    );

    private handleChanges(changes: ObservableChanges<ComponentViewModel>) {
        for (const handler of this._changeHandlers) {
            handler.handleChanges(changes);
        }
    }

    protected getComponents() {
        return Array.from(this._components);
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
        c._parent = this;
        this._components.push(c);
        return c;
    }

    protected insertComponent<TComponent extends Component>(c: TComponent, index: number) {
        if (Object.is(this, c)) {
            throw new Error("cannot add component to itself");
        }
        c._parent = this;
        this._components.splice(index, 0, c);
        return c;
    }

    protected removeComponent(c: Component) {
        const index = this._components.indexOf(c);
        if (index >= 0) {
            this._components.splice(index, 1);
            c.dispose();
        }
        return c;
    }

    moveTo(toIndex: number) {
        const parent = this._parent;
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
        const index = this._components.indexOf(c);
        if (index > -1) {
            this._components.splice(index, 1);
            if (toIndex > index) {
                toIndex--;
            }
            this._components.splice(toIndex, 0, c);
        }
    }

    dispose() {
        const components = this._components.splice(0, this._components.length);
        for (const component of components) {
            component.dispose();
        }
        this.viewModel.dispose();
        const views = this.views.splice(0, this.views.length);
        for (const view of views) {
            view.dispose();
        }
    }
}
