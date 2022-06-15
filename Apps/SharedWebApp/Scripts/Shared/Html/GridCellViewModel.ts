import * as ko from 'knockout';
import { ComponentTemplate } from "../ComponentTemplate";
import { BlockViewModel } from "./BlockViewModel";
import * as template from './GridCell.html';

export class GridCellViewModel extends BlockViewModel {
    constructor() {
        super(new ComponentTemplate('grid-cell', template));
    }

    readonly gridRow = ko.observable<string>(null);

    readonly gridColumn = ko.observable<string>(null);
}