import { DebouncedAction } from "../DebouncedAction";
import { MvvmPage } from "./MvvmPage";
import { ObservableChanges, ComponentViewModel } from "./ComponentViewModel";
import { IComponentView } from "./ComponentView";

export class Component {
    private readonly _changes: ObservableChanges<ComponentViewModel> = {};

    constructor(protected readonly viewModel: ComponentViewModel, protected readonly view: IComponentView) {
        this.viewModel.when.propertyChanged.then(this.onViewModelChanged.bind(this));
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

    protected handleChanges(changes: ObservableChanges<ComponentViewModel>) {
        if (changes.isVisible) {
            if (changes.isVisible.value) {
                this.view.show();
            }
            else {
                this.view.hide();
            }
        }
    }

    dispose() {
        this.viewModel.dispose();
        this.view.dispose();
    }
}
