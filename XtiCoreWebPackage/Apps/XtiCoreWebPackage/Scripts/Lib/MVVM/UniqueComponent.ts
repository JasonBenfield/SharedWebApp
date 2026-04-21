import { ConsoleLogger } from "../ConsoleLogger";
import { GeneratedID } from "../GeneratedID";
import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { CustomEventRegistrations } from "./EventManager";
import { StyleableComponentView } from "./StyleableComponentView";
import { Constructor } from "./Types";

export interface IUniqueViewModel {
    get id(): string;
    set id(id: string);
    get name(): string;
    set name(name: string);
}

export function UniqueViewModelMixin<T extends Constructor<ComponentViewModel>>(Base: T) {
    return class extends Base implements IUniqueViewModel {
        private _id = "";
        get id() { return this._id; }
        set id(id: string) { this._id = id; }
        private _name = "";
        get name() { return this._name; }
        set name(name: string) { this._name = name; }
    };
}

export interface IUniqueView {
    setID(id: string): this;
    setName(name: string): this;
}

export function UniqueViewMixin<T extends Constructor<StyleableComponentView>>(Base: T) {
    return class extends Base implements IUniqueView {
        setName(name: string) {
            return this.setAttribute("name", name);
        }

    };
}
export interface IUniqueComponent {
    readonly whenUnique: CustomEventRegistrations<UniqueComponentEventLayout>;
    get id(): string;
    set id(id: string);
    get name(): string;
    set name(name: string);
}

export type BaseUniqueComponent = Component & IUniqueComponent;

export interface UniqueComponentEventLayout {
    idChanged: string
};

export function UniqueComponentMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base implements IUniqueComponent {
        constructor(...args: any[]) {
            super(...args);
            const nextID = GeneratedID.next(`${this.constructor.name}_`);
            this.id = nextID;
            this.name = nextID;
        }

        private readonly uniqueEvents = this.eventManager.addEvents<UniqueComponentEventLayout>({
            idChanged: null
        });
        readonly whenUnique = this.uniqueEvents.when;

        declare protected readonly viewModel: ComponentViewModel & IUniqueViewModel;

        get id() { return this.viewModel.id; }
        set id(id: string) { this.viewModel.id = id; }
        get name() { return this.viewModel.name; }
        set name(name: string) { this.viewModel.name = name; }

        protected handleChanges(changes: ObservableChanges<ComponentViewModel & IUniqueViewModel>) {
            super.handleChanges(changes);
            if (changes.id) {
                this.uniqueEvents.events.idChanged.invoke(changes.id.value);
            }
        }
    };
}

export class UniqueComponentChangeHandler extends ComponentChangeHandler<ComponentViewModel & IUniqueViewModel, ComponentView & IUniqueView> {
    constructor(viewModel: ComponentViewModel & IUniqueViewModel, view: ComponentView & IUniqueView) {
        super(viewModel, view);
    }

    handleChanges(changes: ObservableChanges<ComponentViewModel & IUniqueViewModel>) {
        if (changes.id) {
            const id = changes.id.value;
            this.updateView(v => v.setID(id));
        }
        if (changes.name) {
            const name = changes.name.value;
            this.updateView(v => v.setName(name));
        }
    }
}