import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Span.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";

export class SpanViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('span', template));
    }
    readonly content = new AggregateComponentViewModel();
}