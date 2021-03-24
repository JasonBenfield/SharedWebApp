import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Block.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";

export class BlockViewModel extends HtmlComponentViewModel implements IHtmlContainerComponentViewModel {
    constructor() {
        super(new ComponentTemplate('block', template));
    }

    readonly content = new AggregateComponentViewModel();

}