import { Block } from "../Html/Block";
import { CssLengthUnit } from "../Html/CssLengthUnit";
import { GridView } from "../Html/GridView";
import { MessageAlertView } from "../MessageAlertView";
import { PaddingCss } from "../PaddingCss";
import { IconCellView } from './IconCellView';
import { ModalODataComponentView } from './ModalODataComponentView';
import { ODataColumnViewBuilder } from "./ODataColumnViewBuilder";
import { ODataFooterComponentView } from "./ODataFooterComponentView";
import { ODataGridView } from "./ODataGridView";
import { ODataTextCellView } from './ODataTextCellView';

export class ODataComponentView extends GridView {
    readonly grid: ODataGridView;
    readonly alert: MessageAlertView;
    readonly footerComponent: ODataFooterComponentView;
    readonly modalODataComponent: ModalODataComponentView;

    constructor() {
        super();
        this.setName(ODataComponentView.name);
        this.borderless();
        this.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        this.height100();
        this.alert = this.addContent(new Block()).addContent(new MessageAlertView());
        let fillRow = this.addContent(new Block())
            .configure(b => {
                b.height100();
                b.setPadding(PaddingCss.xs(0));
                b.positionRelative();
            })
            .addContent(new Block())
            .configure(b => {
                b.positionAbsoluteFill();
                b.scrollable();
            });
        this.grid = fillRow.addContent(new ODataGridView());
        this.footerComponent = this.addContent(new ODataFooterComponentView());
        this.modalODataComponent = this.addContent(new ModalODataComponentView());
    }

    rowHeaderView() {
        return new ODataColumnViewBuilder()
            .setWidth(CssLengthUnit.minContent())
            .setCreateHeaderCellView(
                (r) => {
                    const cellView = new IconCellView(r);
                    cellView.addCssName('position-sticky-top');
                    cellView.addCssName('position-sticky-left');
                    cellView.addCssName('z-4');
                    cellView.icon.solidStyle('gear');
                    return cellView;
                }
            )
            .setCreateDataCellView(
                (r) => {
                    const cellView = new ODataTextCellView(r);
                    cellView.addCssName('position-sticky-left');
                    cellView.addCssName('z-3');
                    return cellView;
                }
            );
    }
}