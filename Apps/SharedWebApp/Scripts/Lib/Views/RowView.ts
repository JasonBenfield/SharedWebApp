import { BasicComponentView } from "./BasicComponentView";
import { ColumnView, LabelColumnView, TextColumnView } from "./ColumnView";
import { FaIconView } from "./FaIconView";
import { HtmlElementView } from "./HtmlElementView";
import { IContainerView } from "./Types";

export class RowView extends BasicComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'div'));
    }

    addIconColumn(config?: (icon: FaIconView) => void) {
        const column = this.addColumn();
        let icon = column.addView(FaIconView);
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