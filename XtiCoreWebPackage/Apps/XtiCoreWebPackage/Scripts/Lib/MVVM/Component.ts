import { DebouncedAction } from "../DebouncedAction";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { MvvmPage } from "./MvvmPage";

export interface IComponentChangeHandler {
    handleChanges(changes: ObservableChanges<ComponentViewModel>): void;
}

export class ComponentChangeHandler {
    constructor(protected readonly view: ComponentView) {
    }

    handleChanges(changes: ObservableChanges<ComponentViewModel>) {
        if (changes.isVisible) {
            if (changes.isVisible.value) {
                this.view.show();
            }
            else {
                this.view.hide();
            }
        }
    }
}

export class Component {
    private readonly _changes: ObservableChanges<ComponentViewModel> = {};
    private readonly _changeHandlers: IComponentChangeHandler[] = [];
    private readonly _components: Component[] = [];
    private _parent: Component | null = null;

    constructor(protected readonly viewModel: ComponentViewModel, protected readonly view: ComponentView, ...changeHandlers: IComponentChangeHandler[]) {
        this.viewModel.when.propertyChanged.then(this.onViewModelChanged.bind(this));
        this._changeHandlers.push(new ComponentChangeHandler(view));
        for (const changeHandler of changeHandlers) {
            this._changeHandlers.push(changeHandler);
        }
        this.handleChanges(viewModel.changes);
    }

    private onViewModelChanged(event: CustomEvent<ObservableChanges<ComponentViewModel>>) {
        const changes: any = this._changes;
        const detail: any = event.detail;
        for (const key in detail) {
            changes[key] = detail[key];
        }
        this.debouncedOnViewModelChanged.execute();
    }

    private readonly debouncedOnViewModelChanged = new DebouncedAction(
        () => {
            const changes: any = this._changes;
            if (changes) {
                this.handleChanges(changes);
                for (const key in changes) {
                    delete changes[key];
                }
            }
        },
        MvvmPage.get().options.debouncedViewModelChangedWait
    );

    private handleChanges(changes: ObservableChanges<ComponentViewModel>) {
        for (const handler of this._changeHandlers) {
            handler.handleChanges(changes);
        }
    }

    hasViewModel(otherViewModel: ComponentViewModel) {
        return this.viewModel === otherViewModel;
    }

    hasView(otherView: ComponentView) {
        return this.view === otherView;
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
            this.view.moveTo(toIndex);
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

    private _isDisposed = false;

    dispose() {
        const components = this._components.splice(0, this._components.length);
        for (const component of components) {
            component.dispose();
        }
        this.viewModel.dispose(); 
        this.view.dispose();
        this._isDisposed = true;
    }
}
