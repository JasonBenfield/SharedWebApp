import { ComponentTemplate } from "../ComponentTemplate";
import * as ko from 'knockout';
import * as template from './Button.html';
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import { SimpleEvent } from "../Events";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";

export class ButtonViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('button', template));
    }

    readonly content = new AggregateComponentViewModel();
    readonly type = ko.observable('');
    readonly isEnabled = ko.observable(true);

    private readonly _clicked = new SimpleEvent(this);
    readonly clicked = this._clicked.handler();

    click() {
        this._clicked.invoke();
        if (this.type() === "submit") {
            return true;
        }
    }
}