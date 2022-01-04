import { ComponentTemplate } from "../ComponentTemplate";
import * as ko from 'knockout';
import * as template from './Link.html';
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import { SimpleEvent } from "../Events";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";

export class LinkViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('link', template));
    }

    readonly content = new AggregateComponentViewModel();
    readonly href = ko.observable('');
    readonly isEnabled = ko.observable(true);

    private readonly _clicked = new SimpleEvent(this);
    readonly clicked = this._clicked.handler();

    click() {
        this._clicked.invoke();
    }
}