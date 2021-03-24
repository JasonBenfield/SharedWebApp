import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Heading1.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";

export class Heading1ViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('heading1', template));
    }
    readonly content = new AggregateComponentViewModel();
}