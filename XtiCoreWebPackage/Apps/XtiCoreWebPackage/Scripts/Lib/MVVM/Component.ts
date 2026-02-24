import { DebouncedAction } from "../DebouncedAction";
import { MvvmPage } from "./MvvmPage";
import { ObservableChanges, ComponentViewModel } from "./ComponentViewModel";
import { IComponentView } from "./ComponentView";

export interface IComponentChangeHandler {
    handleChanges(changes: ObservableChanges<ComponentViewModel>): void;
}

export class ComponentChangeHandler {
    constructor(protected readonly view: IComponentView) {
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

    constructor(protected readonly viewModel: ComponentViewModel, protected readonly view: IComponentView, ...changeHandlers: IComponentChangeHandler[]) {
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


    show() {
        this.viewModel.isVisible = true;
    }

    hide() {
        this.viewModel.isVisible = false;
    }

    dispose() {
        this.viewModel.dispose();
        this.view.dispose();
    }
}
