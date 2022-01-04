import * as ko from 'knockout';
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
export declare class FormViewModel extends HtmlComponentViewModel {
    readonly content: AggregateComponentViewModel;
    readonly action: ko.Observable<string>;
    readonly method: ko.Observable<string>;
    readonly autocomplete: ko.Observable<string>;
    private readonly _submitted;
    readonly submitted: import("../Events").DefaultEventHandler<any>;
    private isDefaultSubmit;
    constructor(content?: AggregateComponentViewModel);
    useDefaultSubmit(): void;
    submit(_: any, event: any): Promise<boolean>;
}
