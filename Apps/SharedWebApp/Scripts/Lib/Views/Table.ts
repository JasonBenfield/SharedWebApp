import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { HtmlElementView } from "./HtmlElementView";
import { IContainerView } from "./Types";

export class TableRowContainerView extends BasicComponentView {
    constructor(container: IContainerView, tagName: 'table' | 'tbody' | 'thead' | 'tfoot') {
        super(HtmlElementView.fromTag(container, tagName));
    }

    addRow() {
        return this.addView(TableRowView);
    }
}

export class TableView extends TableRowContainerView {
    constructor(container: IContainerView) {
        super(container, 'table');
    }

    addCaption() {
        return this.addView(TableCaptionView);
    }

    addColGroup() {
        return this.addView(TableColGroupView);
    }

}

export class TableHeadView extends TableRowContainerView {
    constructor(container: IContainerView) {
        super(container, 'thead');
    }
}

export class TableBodyView extends TableRowContainerView {
    constructor(container: IContainerView) {
        super(container, 'tbody');
    }
}

export class TableFootView extends TableRowContainerView {
    constructor(container: IContainerView) {
        super(container, 'tfoot');
    }
}

export class TableRowView extends BasicComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'tr'));
    }

    addDataCell() {
        return this.addView(TableDataView);
    }

    addHeaderCell() {
        return this.addView(TableHeaderView);
    }
}

export class TableCaptionView extends BasicComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'caption'));
    }
}

export class TableColGroupView extends BasicComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'colgroup'));
    }

    addCol() { return this.addView(TableColView); }
}

export class TableColView extends BasicComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'col'));
    }
}

export class TableDataView extends BasicContainerView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'td'));
    }

}

export class TableHeaderView extends BasicContainerView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'th'));
    }
}