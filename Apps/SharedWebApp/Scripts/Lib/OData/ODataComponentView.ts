import { CssClass } from '../CssClass';
import { Block } from "../Html/Block";
import { CssLengthUnit } from "../Html/CssLengthUnit";
import { MessageAlertView } from "../MessageAlertView";
import { DefaultTextCellFormatter } from "./DefaultTextCellFormatter";
import { IconCellLayout } from "./IconCellLayout";
import { ODataColumnLayouts } from "./ODataColumnLayouts";
import { ODataColumnStyle } from "./ODataColumnStyle";
import { ODataColumnView } from "./ODataColumnView";
import { ODataGridView } from "./ODataGridView";
import { TextCellLayout } from "./TextCellLayout";

export class ODataComponentView extends Block {
    readonly grid: ODataGridView;
    readonly alert: MessageAlertView;

    constructor() {
        super();
        this.grid = this.addContent(new ODataGridView());
        this.alert = this.addContent(new MessageAlertView());
    }

    createRowHeader() {
        return new ODataColumnView(
            CssLengthUnit.minContent(),
            new ODataColumnLayouts()
                .setDefaultLayout(
                    new TextCellLayout(
                        new DefaultTextCellFormatter(),
                        new ODataColumnStyle(
                            {
                                cssClass: new CssClass()
                                    .addNames('position-sticky-left', 'z-3')
                            }
                        )
                    )
                )
                .setHeaderLayout(
                    new IconCellLayout(
                        icon => icon.solidStyle('gear'),
                        new ODataColumnStyle(
                            {
                                cssClass: new CssClass()
                                    .addNames('position-sticky-left', 'z-4')
                            }
                        )
                    )
                )
        );
    }

}