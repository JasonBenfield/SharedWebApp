import { ColumnCss } from "../ColumnCss";
import { Label } from "../Html/Label";
import { LabelViewModel } from "../Html/LabelViewModel";
export declare class LabelColumn extends Label {
    protected readonly vm: LabelViewModel;
    private columnCss;
    constructor(vm?: LabelViewModel);
    setColumnCss(columnCss: ColumnCss): void;
}
