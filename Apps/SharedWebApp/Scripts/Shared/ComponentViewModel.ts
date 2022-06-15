import * as ko from "knockout";

export class ComponentViewModel implements IComponentViewModel {
    private _view: any;

    constructor(componentTemplate: IComponentTemplate) {
        this.componentName(componentTemplate.name);
        componentTemplate.register();
    }

    get view() { return this._view; }

    set view(view: any) { this._view = view; }

    readonly componentName = ko.observable('');
}