import { ContextualClass } from "../ContextualClass";
import { CssClass } from "../CssClass";
import { GridCellView } from "../Html/GridCellView";
import { TextCss } from "../TextCss";

export class ODataColumnStyle {
    constructor(private readonly style: {
        textCss?: TextCss;
        backgroundContext?: ContextualClass;
        cssClass?: CssClass;
    } = {}) {
    }

    apply(view: GridCellView) {
        if (this.style.textCss) {
            view.setTextCss(this.style.textCss);
        }
        if (this.style.backgroundContext) {
            view.setBackgroundContext(this.style.backgroundContext);
        }
        if (this.style.cssClass) {
            view.addCssFrom(this.style.cssClass);
        }
    }
}
