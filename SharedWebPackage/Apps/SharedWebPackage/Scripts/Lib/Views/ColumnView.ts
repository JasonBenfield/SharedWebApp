import { ColumnCss } from "../ColumnCss";
import { BasicComponentView } from "./BasicComponentView";
import { BlockView } from "./BlockView";
import { LabelView } from "./LabelView";
import { TextBlockView } from "./TextBlockView";

export class ColumnView extends BlockView {
    constructor(container: BasicComponentView) {
        super(container);
        this.setColumnCss(ColumnCss.xs());
    }

    setColumnCss(columnCss: ColumnCss) {
        this.setCss('columns', columnCss);
    }
}

export class LabelColumnView extends LabelView {
    constructor(container: BasicComponentView) {
        super(container);
    }

    setColumnCss(columnCss: ColumnCss) {
        this.setCss('columns', columnCss);
    }
}

export class TextColumnView extends TextBlockView {
    constructor(container: BasicComponentView) {
        super(container);
    }

    setColumnCss(columnCss: ColumnCss) {
        this.setCss('columns', columnCss);
    }
}