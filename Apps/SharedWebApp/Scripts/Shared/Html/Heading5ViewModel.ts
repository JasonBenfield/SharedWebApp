import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Heading5.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";

export class Heading5ViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('heading5', template));
    }
    readonly content = new AggregateComponentViewModel();
}