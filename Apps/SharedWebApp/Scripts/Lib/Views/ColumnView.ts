import { ColumnCss } from "../ColumnCss";
import { BlockView } from "./BlockView";
import { LabelView } from "./LabelView";
import { TextBlockView } from "./TextBlockView";
import { IContainerView } from "./Types";

export class ColumnView extends BlockView {
    constructor(container: IContainerView) {
        super(container);
    }

    setColumnCss(columnCss: ColumnCss) {
        this.setCss('columns', columnCss);
    }
}

export class LabelColumnView extends LabelView {
    constructor(container: IContainerView) {
        super(container);
    }

    setColumnCss(columnCss: ColumnCss) {
        this.setCss('columns', columnCss);
    }
}

export class TextColumnView extends TextBlockView {
    constructor(container: IContainerView) {
        super(container);
    }

    setColumnCss(columnCss: ColumnCss) {
        this.setCss('columns', columnCss);
    }
}