import { Block } from "../Html/Block";
import { CssLengthUnit } from "../Html/CssLengthUnit";
import { MessageAlertView } from "../MessageAlertView";
import { IconCellView } from './IconCellView';
import { ModalODataComponentView } from './ModalODataComponentView';
import { ODataColumnView } from "./ODataColumnView";
import { ODataColumnViewBuilder } from "./ODataColumnViewBuilder";
import { ODataGridView } from "./ODataGridView";
import { ODataTextCellView } from './ODataTextCellView';

export class ODataComponentView extends Block {
    readonly grid: ODataGridView;
    readonly alert: MessageAlertView;
    readonly modalODataComponent: ModalODataComponentView;

    constructor() {
        super();
        this.grid = this.addContent(new ODataGridView());
        this.alert = this.addContent(new MessageAlertView());
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