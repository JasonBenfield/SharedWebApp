import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import * as ko from 'knockout';
export declare class BlockViewModel extends HtmlComponentViewModel implements IHtmlContainerComponentViewModel {
    constructor();
    readonly content: AggregateComponentViewModel;
    readonly role: ko.Observable<string>;
}
