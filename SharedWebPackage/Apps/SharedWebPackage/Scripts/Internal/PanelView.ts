import { CssLengthUnit } from "../Lib/CssLengthUnit";
import { BasicComponentView } from "../Lib/Views/BasicComponentView";
import { BlockView } from "../Lib/Views/BlockView";
import { GridView } from "../Lib/Views/Grid";
import { ToolbarView } from "../Lib/Views/ToolbarView";

export class PanelView extends GridView {
    readonly body: BlockView;
    readonly toolbar: ToolbarView;

    constructor(container: BasicComponentView) {
        super(container);
        this.height100();
        this.styleAsLayout();
        this.setTemplateRows(CssLengthUnit.flex(1), CssLengthUnit.auto());
        this.body = GisTheme.instance.mainContent(this.addCell());
        this.toolbar = GisTheme.instance.commandToolbar.toolbar(this.addCell().addView(ToolbarView));
    }
}