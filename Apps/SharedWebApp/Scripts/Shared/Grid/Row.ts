import { FaIcon } from "../FaIcon";
import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { HtmlComponent } from "../Html/HtmlComponent";
import { LabelViewModel } from "../Html/LabelViewModel";
import { TextBlock } from "../Html/TextBlock";
import { Column } from "./Column";
import { LabelColumn } from "./LabelColumn";

export class Row extends HtmlComponent {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('row');
    }

    protected readonly vm: BlockViewModel;

    private readonly block = new Block(this.vm);

    readonly columns: IColumn[] = [];

    addIconColumn(name: string, config?: (icon: FaIcon) => void) {
        let column = this.addColumn();
        let icon = column.addContent(new FaIcon(name));
        config && config(icon);
        return column;
    }

    addTextColumn(text: string = '') {
        let column = this.addColumn();
        column.addContent(new TextBlock(text));
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