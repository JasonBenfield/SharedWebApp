import { FaIcon } from "../FaIcon";
import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { HtmlComponent } from "../Html/HtmlComponent";
import { Column } from "./Column";
import { LabelColumn } from "./LabelColumn";
import { TextColumn } from "./TextColumn";

export class Row extends HtmlComponent {
    protected readonly vm: BlockViewModel;
    private readonly block = new Block(this.vm);
    readonly columns: IColumn[] = [];

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('row');
    }

    addIconColumn(name: string, config?: (icon: FaIcon) => void) {
        let column = this.addColumn();
        let icon = column.addContent(new FaIcon(name));
        config && config(icon);
        return column;
    }

    addTextColumn() {
        let column = this.addColumn();
        column.addContent(new TextColumn());
        return column;
    }

    addColumn() {
        let column = this.block.addContent(new Column());
        this.columns.push(column);
        return column;
    }

    addLabelColumn() {
        let column = this.block.addContent(new LabelColumn());
        this.columns.push(column);
        return column;
    }
}