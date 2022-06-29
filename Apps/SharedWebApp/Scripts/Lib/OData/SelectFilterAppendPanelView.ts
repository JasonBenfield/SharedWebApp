import { ContextualClass } from "../ContextualClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { FlexCss } from "../FlexCss";
import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { BlockView } from "../Views/BlockView";
import { ButtonCommandView } from "../Views/Commands";
import { GridView } from "../Views/Grid";
import { LinkView } from "../Views/LinkView";
import { ModalComponentView } from "../Views/Modal";
import { NavView } from "../Views/NavView";
import { RowView } from "../Views/RowView";
import { TextBlockView } from "../Views/TextBlockView";
import { TextHeading1View, TextHeading3View } from "../Views/TextHeadings";
import { TextLinkView } from "../Views/TextLinkView";
import { ModalODataPanelView } from "./ModalODataPanelView";

export class SelectFilterAppendPanelView extends ModalODataPanelView {
    readonly title: BasicTextComponentView;
    readonly clearItem: TextLinkView;
    readonly appendItem: TextLinkView;
    private readonly conditionBlock: BlockView;
    private readonly grid: GridView;
    readonly backButton: ButtonCommandView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.title = this.header.addView(TextHeading1View);
        const nav = this.body.addView(NavView);
        nav.pills();
        nav.setFlexCss(new FlexCss().column());
        this.clearItem = nav.addTextLink();
        this.clearItem.setMargin(MarginCss.bottom(3));
        this.appendItem = nav.addTextLink();
        this.appendItem.setMargin(MarginCss.bottom(3));
        this.conditionBlock = this.body.addView(BlockView);
        const conditionTitle = this.conditionBlock.addView(TextHeading3View);
        conditionTitle.setMargin(MarginCss.bottom(3));
        conditionTitle.setText('Current Filter');
        this.grid = this.conditionBlock.addView(GridView);
        this.grid.borderless();
        this.grid.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.auto());
        this.footer.setTextCss(new TextCss().start());
        this.footer.addCssName('w-100');
        this.backButton = this.footer.addView(ButtonCommandView);
        this.backButton.useOutlineStyle(ContextualClass.secondary);
        this.backButton.icon.solidStyle('caret-left');
        this.backButton.setText('Back');
    }

    handleClick(action: (view: LinkView) => void) {
        this.body.on('click').select('a').execute(action).subscribe();
    }

    showConditions() { this.conditionBlock.show(); }

    hideConditions() { this.conditionBlock.hide(); }

    clearConditions() {
        this.grid.clearContents();
    }

    addCondition() {
        const cell = this.grid.addCell();
        return cell.addView(TextBlockView);
    }
}