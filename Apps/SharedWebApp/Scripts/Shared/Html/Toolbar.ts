import { ColumnCss } from "../ColumnCss";
import { Column } from "../Grid/Column";
import { Row } from "../Grid/Row";
import { Block } from "./Block";
import { BlockViewModel } from "./BlockViewModel";
import { Container } from "./Container";
import { HtmlComponent } from "./HtmlComponent";

export class Toolbar extends HtmlComponent {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        let container = new Block(vm).addContent(new Container());
        let row = container.addContent(new Row());
        this.columnStart = row.addColumn()
            .configure(c => {
                c.setColumnCss(ColumnCss.xs())
            });
        this.columnEnd = row.addColumn()
            .configure(c => {
                c.setColumnCss(ColumnCss.xs('auto'))
            });
    }

    readonly columnStart: Column;
    readonly columnEnd: Column;
}