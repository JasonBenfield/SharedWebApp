import { EventManager } from "./EventManager";
import { ObservableArray } from "./ObservableArray";

type EventLayout = {
    propertyChanged: { [name: string]: PropertyChange };
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
                    if (originalValue !== value) {
                        Reflect.set(target, property, value);
                        const change = new PropertyChange(
                            target,
                            property,
                            originalValue,
                            value
                        );
                        const changes = this._changes as any;
                        changes[property] = change;
                        this._eventManager.events.propertyChanged.invoke({
                            [property]: change
                        });
                    }
                    return true;
                },
            }
        );
        for (const key in initializer) {
            (<any>proxy)[key] = (<any>initializer)[key];
        }
        return proxy;
    }

    get changes() { return this._changes; }

    private _isVisible = true;

    get isVisible() { return this._isVisible; }

    set isVisible(isVisible: boolean) { this._isVisible = isVisible; }

    dispose() {
        this._eventManager.dispose();
    }
}

export interface PropertyChangedEventListener {
    (evt: CustomEvent<{ [name: string]: PropertyChange }>): void;
}

type excludedViewModelProperties =
    "changes" |
    "manager" |
    "when" |
    "dispose" |
    "createComponent" |
    "setComponentFactory";

export type ComponentViewModelDataKeys<T> = {
    [K in keyof T]:
    K extends excludedViewModelProperties ? never :
    T[K] extends ComponentViewModel ? never :
    T[K] extends ObservableArray<any> ? never :
    K;
}[keyof T];

export type ComponentViewModelData<T extends ComponentViewModel> = Pick<T, ComponentViewModelDataKeys<T>>;

export type ObservableChanges<T> = {
    [Key in ComponentViewModelDataKeys<T>]?: PropertyChange;
}

export class PropertyChange {
    constructor(
        readonly target: any,
        readonly propertyName: string,
        readonly originalValue: any,
        readonly value: any
    ) {
    }
}
