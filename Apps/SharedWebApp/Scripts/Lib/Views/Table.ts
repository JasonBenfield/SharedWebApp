import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";

export class TableRowContainerView extends BasicComponentView {
    constructor(container: BasicComponentView, tagName: 'table' | 'tbody' | 'thead' | 'tfoot') {
        super(container, tagName);
    }

    addRow() {
        return this.addView(TableRowView);
    }
}

export class TableView extends TableRowContainerView {
    constructor(container: BasicComponentView) {
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
    constructor(container: BasicComponentView) {
        super(container, 'thead');
    }
}

export class TableBodyView extends TableRowContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'tbody');
    }
}

export class TableFootView extends TableRowContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'tfoot');
    }
}

export class TableRowView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'tr');
    }

    addDataCell() {
        return this.addView(TableDataView);
    }

    addHeaderCell() {
        return this.addView(TableHeaderView);
    }
}

export class TableCaptionView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'caption');
    }
}

export class TableColGroupView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'colgroup');
    }

    addCol() { return this.addView(TableColView); }
}

export class TableColView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'col');
    }
}

export class TableDataView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'td');
    }

}

export class TableHeaderView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'th');
    }
}