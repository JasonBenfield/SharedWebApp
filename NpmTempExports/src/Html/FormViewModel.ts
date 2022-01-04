import * as ko from 'knockout';
import { ComponentTemplate } from "../ComponentTemplate";
import { DelayedAction } from "../DelayedAction";
import { SimpleEvent } from "../Events";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import * as template from './Form.html';
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";

export class FormViewModel extends HtmlComponentViewModel {
    readonly action = ko.observable<string>(null);
    readonly method = ko.observable<string>(null);
    readonly autocomplete = ko.observable<string>(null);

    private readonly _submitted = new SimpleEvent(this);
    readonly submitted = this._submitted.handler();

    private isDefaultSubmit = false;

    constructor(public readonly content = new AggregateComponentViewModel()) {
        super(new ComponentTemplate('form-component', template));
    }

    useDefaultSubmit() {
        this.isDefaultSubmit = true;
    }

    async submit(_, event) {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        await DelayedAction.delay(300);
        this._submitted.invoke();
        return this.isDefaultSubmit;
    }
}