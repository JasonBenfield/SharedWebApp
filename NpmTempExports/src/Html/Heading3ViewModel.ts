import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Heading3.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";

export class Heading3ViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('heading3', template));
    }
    readonly content = new AggregateComponentViewModel();
}