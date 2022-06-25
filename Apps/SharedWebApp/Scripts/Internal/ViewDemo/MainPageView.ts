import { BodyView } from '../../Lib/Views/BodyView';
import { BlockView } from '../../Lib/Views/BlockView';
import { Heading1View } from '../../Lib/Views/Headings';
import { TextHeading3View } from '../../Lib/Views/TextHeadings';
import { ContextualClass } from '../../Lib/ContextualClass';
import { PaddingCss } from '../../Lib/PaddingCss';
import { TextBlockView } from '../../Lib/Views/TextBlockView';
import { HorizontalRuleView } from '../../Lib/Views/HorizontalRuleView';
import { GridListGroupView } from '../../Lib/Views/ListGroup';
import { DemoGridListGroupItemView } from './DemoGridListGroupItemView';
import { CssLengthUnit } from '../../Lib/Html/CssLengthUnit';
import { DropdownContainerView } from '../../Lib/Views/Dropdown'
import { TextSpanView } from '../../Lib/Views/TextSpanView';
import { ModalMessageAlertView } from '../../Lib/Views/Modal';

export class MainPageView extends BlockView {
    readonly demoGridListGroup: GridListGroupView;
    readonly modalAlert: ModalMessageAlertView;

    constructor() {
        super(new BodyView());
        this.modalAlert = this.addView(ModalMessageAlertView);
        this.addCssName('d-contents');
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
        const dropdownListItem = dropdownContainer.dropdown.menu.addListItem();
        const dropdownText = dropdownListItem.addView(TextBlockView);
        dropdownText.setText('Testing');
        this.demoGridListGroup = block.addView(GridListGroupView);
        this.demoGridListGroup.setItemViewType(DemoGridListGroupItemView);
        this.demoGridListGroup.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
    }
}