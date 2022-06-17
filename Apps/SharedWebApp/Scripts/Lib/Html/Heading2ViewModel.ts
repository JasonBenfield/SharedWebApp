import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Heading2.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";

export class Heading2ViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('heading2', template));
    }
    readonly content = new AggregateComponentViewModel();
}