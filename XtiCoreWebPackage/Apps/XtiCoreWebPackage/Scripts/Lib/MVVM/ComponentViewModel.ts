import { areValuesEqual } from "./Equatable";
import { EventManager } from "./EventManager";
import { ObservableArray } from "./ObservableArray";

type EventLayout = {
    propertyChanged: UpdatedViewModel;
}

export type ComponentViewModelInitializer<TViewModel extends ComponentViewModel> = Partial<ComponentViewModelData<TViewModel>>;

export class ComponentViewModel {

    private readonly _eventManager = new EventManager<EventLayout>({
        propertyChanged: null
    });
    readonly when = this._eventManager.when;

    private readonly _changes: ObservableChanges<typeof this> = {};

    constructor(initializer: ComponentViewModelInitializer<ComponentViewModel> = {}) {
        const proxy = new Proxy(
            this,
            {
                set: (target: any, property: string, value) => {
                    const originalValue = Reflect.get(target, property);
                    Reflect.set(target, property, value);
                    if (!areValuesEqual(originalValue, value)) {
                        const change = new ChangedProperty(
                            target,
                            property,
                            originalValue,
                            value
                        );
                        const changes = this._changes as any;
                        changes[property] = change;
                        this._eventManager.events.propertyChanged?.invoke({
                            viewModel: this,
                            changedProperty: change
                        });
                    }
                    return true;
                },
            }
        );
        for (const key in initializer) {
            const initialValue = Reflect.get(initializer, key);
            Reflect.set(proxy, key, initialValue);
        }
        return proxy;
    }

    get changes() { return this._changes; }

    private _isVisible = true;

    get isVisible() { return this._isVisible; }

    set isVisible(isVisible: boolean) { this._isVisible = isVisible; }

    notify<TOtherEvents>(otherEventManager: EventManager<TOtherEvents>) {
        this._eventManager.notify(otherEventManager);
    }

    dispose() {
        for (const key in this) {
            const propertyValue = Reflect.get(this, key);
            if (propertyValue instanceof ComponentViewModel) {
                propertyValue.dispose();
            }
            else if (propertyValue instanceof ObservableArray) {
                propertyValue.dispose();
            }
        }
        this._eventManager.dispose();
    }
}

export type ExcludedViewModelProperties =
    "changes" |
    "manager" |
    "when" |
    "notify" |
    "dispose" |
    "createComponent" |
    "setComponentFactory";

export type ComponentViewModelDataKeys<T> = {
    [K in keyof T]:
    K extends ExcludedViewModelProperties ? never :
    T[K] extends ComponentViewModel ? never :
    T[K] extends ObservableArray<any> ? never :
    K;
}[keyof T];

export type ComponentViewModelData<T extends ComponentViewModel> = Pick<T, ComponentViewModelDataKeys<T>>;

export type ObservableChanges<T> = {
    [Key in ComponentViewModelDataKeys<T>]?: ChangedProperty;
}

export interface UpdatedViewModel {
    viewModel: ComponentViewModel;
    changedProperty: ChangedProperty;
}

export class ChangedProperty {
    constructor(
        readonly target: any,
        readonly propertyName: string,
        readonly originalValue: any,
        readonly value: any
    ) {
    }
}
