import { ColumnCss } from "../ColumnCss";
import { Label } from "../Html/Label";
import { LabelViewModel } from "../Html/LabelViewModel";

export class LabelColumn extends Label {
    constructor(vm: LabelViewModel = new LabelViewModel()) {
        super(vm);
        this.setColumnCss(ColumnCss.xs());
        this.addCssName('col-form-label');
    }

    protected readonly vm: LabelViewModel;

    private columnCss: ColumnCss;

    setColumnCss(columnCss: ColumnCss) {
        this.replaceCssName(
            this.columnCss && this.columnCss.toString(),
            columnCss && columnCss.toString()
        );
    }
}