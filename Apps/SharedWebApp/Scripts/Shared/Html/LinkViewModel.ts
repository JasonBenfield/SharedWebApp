import { ComponentTemplate } from "../ComponentTemplate";
import * as ko from 'knockout';
import * as template from './Link.html';
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import { SimpleEvent } from "../Events";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";

export class LinkViewModel extends HtmlComponentViewModel {
    readonly content = new AggregateComponentViewModel();
    readonly href = ko.observable('');
    readonly isEnabled = ko.observable(true);

    private readonly _clicked = new SimpleEvent(this);
    readonly clicked = this._clicked.handler();
    private clickResult: boolean;

    constructor() {
        super(new ComponentTemplate('link', template));
    }

    defaultClick() {
        this.clickResult = true;
    }

    overrideDefaultClick() {
        this.clickResult = false;
    }

    click() {
        this._clicked.invoke();
        let clickResult = this.clickResult;
        if (clickResult === undefined) {
            let href = this.href();
            clickResult = Boolean(href && href !== 'javascript:;');
        }
        return clickResult;
    }
}