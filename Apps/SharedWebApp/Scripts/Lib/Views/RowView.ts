import { BasicComponentView } from "./BasicComponentView";
import { ColumnView, LabelColumnView, TextColumnView } from "./ColumnView";
import { FaIconView } from "./FaIconView";

export class RowView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('row');
    }

    addIconColumn(config?: (icon: FaIconView) => void) {
        const column = this.addColumn();
        const icon = column.addView(FaIconView);
        config && config(icon);
        return column;
    }

    addTextColumn() {
        return this.addView(TextColumnView);
    }

    addColumn() {
        return this.addView(ColumnView);
    }

    addLabelColumn() {
        return this.addView(LabelColumnView);
    }
}