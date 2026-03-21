import { ConsoleLogger } from "../ConsoleLogger";
import { GeneratedID } from "../GeneratedID";
import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { CurrentFocused } from "./CurrentFocused";
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
    setID(id: string): void;
    setName(name: string): void;
}

export interface IUniqueComponent {
    get id(): string;
    set id(id: string);
    get name(): string;
    set name(name: string);
}

export function UniqueComponentMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base implements IUniqueComponent {
        declare protected readonly viewModel: ComponentViewModel & IUniqueViewModel;
        constructor(...args: any[]) {
            super(...args);
            const nextID = GeneratedID.next(`${this.constructor.name}_`);
            this.id = nextID;
            this.name = nextID;
        }

        get id() { return this.viewModel.id; }
        set id(id: string) { this.viewModel.id = id; }
        get name() { return this.viewModel.name; }
        set name(name: string) { this.viewModel.name = name; }
    };
}

export class UniqueComponentChangeHandler extends ComponentChangeHandler<ComponentViewModel & IUniqueViewModel, ComponentView & IUniqueView> {
    constructor(viewModel: ComponentViewModel & IUniqueViewModel, view: ComponentView & IUniqueView) {
        super(viewModel, view);
    }

    handleChanges(changes: ObservableChanges<ComponentViewModel & IUniqueViewModel>) {
        if (changes.id) {
            const id: string = changes.id.value;
            this.updateView(v => v.setID(id));
        }
        if (changes.name) {
            const name: string = changes.name.value;
            this.updateView(v => v.setName(name));
        }
    }
}