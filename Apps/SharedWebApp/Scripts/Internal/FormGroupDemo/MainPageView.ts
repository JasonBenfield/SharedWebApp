import { ContextualClass } from '../../Lib/ContextualClass';
import { CssLengthUnit } from '../../Lib/CssLengthUnit';
import { FlexCss } from '../../Lib/FlexCss';
import { MarginCss } from '../../Lib/MarginCss';
import { BlockView } from '../../Lib/Views/BlockView';
import { ButtonCommandView } from '../../Lib/Views/Command';
import { FormGroupAlertView, FormGroupDateTimeInputView, FormGroupGridView, FormGroupInputView, FormGroupSelectView, FormGroupTextAreaView, FormGroupTextView } from '../../Lib/Views/FormGroup';
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
    readonly demoFormGroupDateInputView: FormGroupInputView;
    readonly demoFormGroupTimeInputView: FormGroupInputView;
    readonly demoFormGroupDateTimeInputView: FormGroupDateTimeInputView;
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
        formGroupContainer.addCssName('was-validated');
        this.demoFormGroupInputView = formGroupContainer.addFormGroup(FormGroupInputView);
        this.demoFormGroupInputView.input.setType('email');
        this.demoFormGroupAlertView = formGroupContainer.addFormGroup(FormGroupAlertView);
        this.demoFormGroupSelectView = formGroupContainer.addFormGroup(FormGroupSelectView);
        this.demoFormGroupTextAreaView = formGroupContainer.addFormGroup(FormGroupTextAreaView);
        this.demoFormGroupTextView = formGroupContainer.addFormGroup(FormGroupTextView);
        this.demoFormGroupDateInputView = formGroupContainer.addFormGroup(FormGroupInputView);
        this.demoFormGroupTimeInputView = formGroupContainer.addFormGroup(FormGroupInputView);
        this.demoFormGroupDateTimeInputView = formGroupContainer.addFormGroup(FormGroupDateTimeInputView);
        formGroupContainer.setMargin(MarginCss.bottom(3));
        this.showButton = flexColumn.addView(BlockView).addView(ButtonCommandView);
        this.showButton.setWidth(CssLengthUnit.percentage(50));
        this.showButton.setText('Show Values');
        this.showButton.useOutlineStyle(ContextualClass.primary);
        this.showButton.setMargin(MarginCss.bottom(3));
        this.alertView = flexColumn.addView(MessageAlertView);
        this.valueListView = flexColumn.addListGroup(TextListGroupItemView);
    }
}