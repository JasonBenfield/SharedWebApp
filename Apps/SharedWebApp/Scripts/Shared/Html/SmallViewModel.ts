import * as template from './Small.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import { AggregateComponentViewModel } from './AggregateComponentViewModel';

export class SmallViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('small', template));
    }
    readonly content = new AggregateComponentViewModel();
}