﻿import { ContextualClass } from '../../Lib/ContextualClass';
import { CssLengthUnit } from '../../Lib/CssLengthUnit';
import { PaddingCss } from '../../Lib/PaddingCss';
import { BlockView } from '../../Lib/Views/BlockView';
import { DropdownContainerView } from '../../Lib/Views/Dropdown';
import { Heading1View } from '../../Lib/Views/Headings';
import { HorizontalRuleView } from '../../Lib/Views/HorizontalRuleView';
import { GridListGroupView } from '../../Lib/Views/ListGroup';
import { ModalConfirmView, ModalMessageAlertView } from '../../Lib/Views/Modal';
import { ModalErrorView } from '../../Lib/Views/ModalError';
import { BasicPageView } from '../../Lib/Views/BasicPageView';
import { TextBlockView } from '../../Lib/Views/TextBlockView';
import { TextHeading3View } from '../../Lib/Views/TextHeadings';
import { TextSpanView } from '../../Lib/Views/TextSpanView';
import { DemoGridListGroupItemView } from './DemoGridListGroupItemView';

export class MainPageView extends BasicPageView {
    readonly demoGridListGroup: GridListGroupView;
    readonly modalConfirm: ModalConfirmView;
    readonly modalAlert: ModalMessageAlertView;
    readonly modalError: ModalErrorView;

    constructor() {
        super();
        this.modalConfirm = this.addView(ModalConfirmView);
        this.modalAlert = this.addView(ModalMessageAlertView);
        this.modalError = this.addView(ModalErrorView);
        const container = this.addView(BlockView);
        container.height100();
        container.addCssName('container');
        container.setBackgroundContext(ContextualClass.primary);
        container.setPadding(PaddingCss.xs(3));
        const block = container.addView(BlockView);
        block.height100();
        block.setBackgroundContext(ContextualClass.light);
        block.addView(Heading1View)
            .addView(TextBlockView)
            .configure(tb => tb.setText('Heading 1'));
        block.addView(HorizontalRuleView);
        block.addView(TextHeading3View)
            .configure(th => th.setText('Heading 3'));
        const dropdownContainer = block.addView(DropdownContainerView);
        dropdownContainer.dropdown.button.addView(TextSpanView).setText('Dropdown');
        const dropdownListItem = dropdownContainer.dropdown.menu.addSpanItem();
        const dropdownText = dropdownListItem.addView(TextSpanView);
        dropdownText.setText('Testing');
        this.demoGridListGroup = block.addView(GridListGroupView);
        this.demoGridListGroup.setItemViewType(DemoGridListGroupItemView);
        this.demoGridListGroup.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
    }
}