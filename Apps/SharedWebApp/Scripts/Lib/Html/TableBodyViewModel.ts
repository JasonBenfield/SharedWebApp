import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './TableBody.html';

export class TableBodyViewModel extends HtmlComponentViewModel implements IHtmlContainerComponentViewModel {
    constructor() {
        super(new ComponentTemplate('table-body', template));
    }

    readonly content = new AggregateComponentViewModel();
}