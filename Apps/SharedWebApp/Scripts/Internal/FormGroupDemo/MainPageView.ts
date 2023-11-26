﻿import { ContextualClass } from '../../Lib/ContextualClass';
import { CssLengthUnit } from '../../Lib/CssLengthUnit';
import { FlexCss } from '../../Lib/FlexCss';
import { MarginCss } from '../../Lib/MarginCss';
import { BlockView } from '../../Lib/Views/BlockView';
import { ButtonCommandView } from '../../Lib/Views/Command';
import { FormView } from '../../Lib/Views/FormView';
import { ListGroupView, TextListGroupItemView } from '../../Lib/Views/ListGroup';
import { MessageAlertView } from '../../Lib/Views/MessageAlertView';
import { TextHeading1View } from '../../Lib/Views/TextHeadings';
import { SharedPageView } from '../SharedPageView';

export class MainPageView extends SharedPageView {
    readonly heading: TextHeading1View;
    readonly formView: FormView;
    readonly showButton: ButtonCommandView;
    readonly alertView: MessageAlertView;
    readonly valueListView: ListGroupView<TextListGroupItemView>;

    constructor() {
        super();
        const flexColumn = this.addView(BlockView)
            .configure(c => {
                c.addCssName('container');
                c.setFlexCss(new FlexCss().column());
                c.height100();
                c.scrollable();
            });
        this.heading = flexColumn
            .addView(BlockView)
            .addView(TextHeading1View);
        this.heading.setText('Form Groups');
        this.formView = flexColumn.addView(FormView);
        this.formView.setMargin(MarginCss.bottom(3));
        this.showButton = flexColumn.addView(BlockView).addView(ButtonCommandView);
        this.showButton.setWidth(CssLengthUnit.percentage(50));
        this.showButton.setText('Show Values');
        this.showButton.useOutlineStyle(ContextualClass.primary);
        this.showButton.setMargin(MarginCss.bottom(3));
        this.alertView = flexColumn.addView(MessageAlertView);
        this.valueListView = flexColumn.addListGroup(TextListGroupItemView);
    }
}