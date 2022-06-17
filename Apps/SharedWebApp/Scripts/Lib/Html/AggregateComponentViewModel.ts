import { ComponentTemplate } from "../ComponentTemplate";
import { ComponentViewModel } from "../ComponentViewModel";
import * as template from './AggregateComponent.html';
import * as ko from 'knockout';

export class AggregateComponentViewModel extends ComponentViewModel implements IAggregateComponentViewModel {
    constructor() {
        super(new ComponentTemplate('aggregate-component', template));
    }

    readonly name = ko.observable('');
    readonly items = ko.observableArray<IComponentViewModel>([]);
    readonly isVisible = ko.observable(true);
}