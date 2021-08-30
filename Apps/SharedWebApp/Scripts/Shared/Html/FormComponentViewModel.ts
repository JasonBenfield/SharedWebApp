import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './FormComponent.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import * as ko from 'knockout';
import { SimpleEvent } from "../Events";
import { DelayedAction } from "../DelayedAction";

export class FormComponentViewModel extends HtmlComponentViewModel {
    constructor(public readonly content = new AggregateComponentViewModel()) {
        super(new ComponentTemplate('form-component', template));
    }

    readonly action = ko.observable<string>(null);
    readonly method = ko.observable<string>(null);
    readonly autocomplete = ko.observable<string>(null);

    private readonly _submitted = new SimpleEvent(this);
    readonly submitted = this._submitted.handler();

    private isDefaultSubmit = false;

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