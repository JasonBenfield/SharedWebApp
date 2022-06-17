import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Heading4.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";

export class Heading4ViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('heading4', template));
    }
    readonly content = new AggregateComponentViewModel();
}