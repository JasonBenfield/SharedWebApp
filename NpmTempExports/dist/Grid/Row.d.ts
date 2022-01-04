import { FaIcon } from "../FaIcon";
import { BlockViewModel } from "../Html/BlockViewModel";
import { HtmlComponent } from "../Html/HtmlComponent";
import { Column } from "./Column";
import { LabelColumn } from "./LabelColumn";
export declare class Row extends HtmlComponent {
    protected readonly vm: BlockViewModel;
    private readonly block;
    readonly columns: IColumn[];
    constructor(vm?: BlockViewModel);
    addIconColumn(name: string, config?: (icon: FaIcon) => void): Column;
    addTextColumn(): Column;
    addColumn(): Column;
    addLabelColumn(): LabelColumn;
}
