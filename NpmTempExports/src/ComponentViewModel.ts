import * as ko from "knockout";

export class ComponentViewModel implements IComponentViewModel {
    constructor(componentTemplate: IComponentTemplate) {
        this.componentName(componentTemplate.name);
        componentTemplate.register();
    }

    readonly componentName = ko.observable('');
}