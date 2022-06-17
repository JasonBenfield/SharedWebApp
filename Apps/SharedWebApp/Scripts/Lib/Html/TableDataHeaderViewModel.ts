import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './TableDataHeader.html';
import * as ko from 'knockout';

export class TableDataHeaderViewModel extends HtmlComponentViewModel implements IHtmlContainerComponentViewModel {
    constructor() {
        super(new ComponentTemplate('table-data-header', template));
    }

    readonly content = new AggregateComponentViewModel();

    readonly attr: ko.Observable<ITableDataAttributes>;
}