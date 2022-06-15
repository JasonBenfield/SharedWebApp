import { ColumnCss } from "../ColumnCss";
import { LabelView } from "../Html/LabelView";
import { LabelViewModel } from "../Html/LabelViewModel";

export class LabelColumn extends LabelView {
    protected readonly vm: LabelViewModel;
    private columnCss: ColumnCss;

    constructor(vm: LabelViewModel = new LabelViewModel()) {
        super(vm);
        this.setColumnCss(ColumnCss.xs());
        this.addCssName('col-form-label');
    }

    setColumnCss(columnCss: ColumnCss) {
        this.replaceCssName(
            this.columnCss && this.columnCss.toString(),
            columnCss && columnCss.toString()
        );
    }
}