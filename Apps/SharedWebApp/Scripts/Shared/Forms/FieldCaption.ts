import { ColumnCss } from "../ColumnCss";
import { CssClass } from "../CssClass";

export class FieldCaption {
    constructor(private readonly vm: IFieldCaptionViewModel) {
    }

    private caption: string;

    setCaption(caption: string) {
        this.caption = caption;
        this.vm.caption(caption);
    }

    getCaption() {
        return this.caption;
    }

    setColumns(columns: ColumnCss) {
        let css = new CssClass('col-form-label');
        if (columns) {
            css.addName(columns.toString());
        }
        this.vm.css(css.toString());
    }
}