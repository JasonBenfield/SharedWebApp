import { ColumnCss } from "../ColumnCss";
import { ContextualClass } from "../ContextualClass";
import { PaddingCss } from "../PaddingCss";
import { TextCss } from "../TextCss";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { BlockView } from "../Views/BlockView";
import { ButtonGroupView } from "../Views/ButtonGroupView";
import { RowView } from "../Views/RowView";
import { TextBlockView } from "../Views/TextBlockView";

export class ODataFooterComponentView extends BlockView {
    private readonly commandButtonGroup: ButtonGroupView;
    readonly pageButtonGroup: ButtonGroupView;
    readonly count: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.setPadding(PaddingCss.xs(3));
        const row = this.addView(RowView);
        const col1 = row.addColumn();
        col1.setColumnCss(ColumnCss.xs('auto'));
        this.commandButtonGroup = col1.addView(ButtonGroupView);
        this.commandButtonGroup.styleButtonDefault(
            b => b.useOutlineStyle(ContextualClass.primary)
        );
        const col2 = row.addColumn();
        col2.setColumnCss(ColumnCss.xs('auto'));
        this.pageButtonGroup = col2.addView(ButtonGroupView);
        this.pageButtonGroup.styleTextButtonDefault(
            b => b.useOutlineStyle(ContextualClass.primary)
        );
        this.pageButtonGroup.styleTextDefault(
            t => t.setPadding(PaddingCss.xs({ start: 3, end: 3 }))
        );
        const col3 = row.addColumn();
        col3.setTextCss(new TextCss().end());
        col3.addCssName('col-form-label');
        this.count = col3.addView(TextBlockView);
    }

    addRefreshButton() {
        const button = this.commandButtonGroup.addButtonCommand();
        button.icon.solidStyle('rotate');
        button.useOutlineStyle(ContextualClass.primary);
        return button;
    }

    addExcelButton() {
        const button = this.commandButtonGroup.addButtonCommand();
        button.icon.solidStyle('file-excel');
        button.useOutlineStyle(ContextualClass.success);
        return button;
    }
}