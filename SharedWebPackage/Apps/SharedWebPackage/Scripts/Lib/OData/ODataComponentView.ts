import { CssLengthUnit } from "../CssLengthUnit";
import { PaddingCss } from "../PaddingCss";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BlockView } from "../Views/BlockView";
import { BasicGridRowView, GridRowView, GridView } from "../Views/Grid";
import { MessageAlertView } from "../Views/MessageAlertView";
import { IconCellView } from './IconCellView';
import { ModalODataComponentView } from './ModalODataComponentView';
import { ODataColumnViewBuilder } from "./ODataColumnViewBuilder";
import { ODataFooterComponentView } from "./ODataFooterComponentView";
import { ODataGridView } from "./ODataGridView";
import { ODataHeaderCellView } from "./ODataHeaderCellView";
import { ODataTextCellView } from './ODataTextCellView';

export class ODataComponentView extends GridView {
    readonly grid: ODataGridView;
    readonly alert: MessageAlertView;
    readonly footerComponent: ODataFooterComponentView;
    readonly modalODataComponent: ModalODataComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.setViewName(ODataComponentView.name);
        this.borderless();
        this.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        this.height100();
        this.alert = this.addView(BlockView).addView(MessageAlertView);
        this.alert.setMaxHeight(CssLengthUnit.em(7));
        this.alert.scrollable();
        const fillRow = this.addView(BlockView)
            .configure(b => {
                b.height100();
                b.setPadding(PaddingCss.xs(0));
                b.positionRelative();
            })
            .addView(BlockView)
            .configure(b => {
                b.positionAbsoluteFill();
                b.scrollable();
            });
        this.grid = fillRow.addView(ODataGridView);
        this.footerComponent = this.addView(ODataFooterComponentView);
        this.modalODataComponent = this.addView(ModalODataComponentView);
    }

    configureDataRow(configureDataRow: (grid: GridView) => BasicGridRowView) {
        this.grid.configureDataRow(configureDataRow);
        return this;
    }

    setViewID(id: string) {
        super.setViewID(id);
        this.modalODataComponent.setViewID(`${id}ModalODataComponent`);
    }

    addToClickSelection(clickSelection: string) {
        this.grid.addToClickSelection(clickSelection);
    }

    columnStart() {
        return new ODataColumnViewBuilder()
            .setWidth(CssLengthUnit.minContent())
            .headerCell(
                IconCellView,
                (cellView) => {
                    cellView.addCssName('position-sticky-top');
                    cellView.addCssName('position-sticky-left');
                    cellView.addCssName('z-5');
                    cellView.icon.solidStyle('gear');
                    cellView.addCssName('odata-gear-header');
                }
            )
            .dataCell(
                ODataTextCellView,
                (cellView) => {
                    cellView.addCssName('position-sticky-left');
                    cellView.addCssName('z-3');
                }
            );
    }

    columnEnd() {
        return new ODataColumnViewBuilder()
            .setWidth(CssLengthUnit.px(50))
            .headerCell(
                ODataHeaderCellView,
                (cellView) => {
                    cellView.removeCssName('grid-heading');
                    cellView.columnName.hide();
                    cellView.sortButton.hide();
                }
            );
    }
}