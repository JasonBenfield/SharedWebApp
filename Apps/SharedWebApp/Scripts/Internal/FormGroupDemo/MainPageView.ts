import { ContextualClass } from '../../Lib/ContextualClass';
import { CssLengthUnit } from '../../Lib/CssLengthUnit';
import { FlexCss } from '../../Lib/FlexCss';
import { BlockView } from '../../Lib/Views/BlockView';
import { ButtonCommandView } from '../../Lib/Views/Command';
import { FormGroupAlertView, FormGroupGridView, FormGroupInputView, FormGroupSelectView, FormGroupTextAreaView, FormGroupTextView } from '../../Lib/Views/FormGroup';
import { ListGroupView, TextListGroupItemView } from '../../Lib/Views/ListGroup';
import { MessageAlertView } from '../../Lib/Views/MessageAlertView';
import { TextHeading1View } from '../../Lib/Views/TextHeadings';
import { SharedPageView } from '../SharedPageView';

export class MainPageView extends SharedPageView {
    readonly heading: TextHeading1View;
    readonly demoFormGroupInputView: FormGroupInputView;
    readonly demoFormGroupAlertView: FormGroupAlertView;
    readonly demoFormGroupSelectView: FormGroupSelectView;
    readonly demoFormGroupTextAreaView: FormGroupTextAreaView;
    readonly demoFormGroupTextView: FormGroupTextView;
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
        const formGroupContainer = flexColumn.addView(FormGroupGridView);
        this.demoFormGroupInputView = formGroupContainer.addFormGroup(FormGroupInputView);
        this.demoFormGroupAlertView = formGroupContainer.addFormGroup(FormGroupAlertView);
        this.demoFormGroupSelectView = formGroupContainer.addFormGroup(FormGroupSelectView);
        this.demoFormGroupTextAreaView = formGroupContainer.addFormGroup(FormGroupTextAreaView);
        this.demoFormGroupTextView = formGroupContainer.addFormGroup(FormGroupTextView);
        this.showButton = flexColumn.addView(BlockView).addView(ButtonCommandView);
        this.showButton.setWidth(CssLengthUnit.percentage(50));
        this.showButton.setText('Show Values');
        this.showButton.useOutlineStyle(ContextualClass.primary);
        this.alertView = flexColumn.addView(MessageAlertView);
        this.valueListView = flexColumn.addListGroup(TextListGroupItemView);
    }
}