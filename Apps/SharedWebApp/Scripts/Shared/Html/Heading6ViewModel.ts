import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Heading6.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";

export class Heading6ViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('heading6', template));
    }
    readonly content = new AggregateComponentViewModel();
}