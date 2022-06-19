import { GridCellView } from "../Html/GridCellView";
import { ICellStyle } from "./Types";

export class ODataColumnStyle {
    constructor(private readonly style: ICellStyle = {}) {
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
