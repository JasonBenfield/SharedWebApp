import { ContextualClass } from '../../Lib/ContextualClass';
import { CssLengthUnit } from '../../Lib/CssLengthUnit';
import { FlexCss } from '../../Lib/FlexCss';
import { MarginCss } from '../../Lib/MarginCss';
import { BlockView } from '../../Lib/Views/BlockView';
import { ButtonCommandView } from '../../Lib/Views/Command';
import { FormGroupAlertView, FormGroupBooleanInputView, FormGroupDateTimeInputView, FormGroupInputView, FormGroupLinkView, FormGroupSelectView, FormGroupTextAreaView, FormGroupTextView, FormGroupTimeSpanInputView, FormGroupView } from '../../Lib/Views/FormGroup';
import { FormGroupContainerView } from '../../Lib/Views/FormGroupContainerView';
import { FormView } from '../../Lib/Views/FormView';
import { ListGroupView, TextListGroupItemView } from '../../Lib/Views/ListGroup';
import { MessageAlertView } from '../../Lib/Views/MessageAlertView';
import { TextHeading1View } from '../../Lib/Views/TextHeadings';
import { SharedPageView } from '../SharedPageView';

export class MainPageView extends SharedPageView {
    readonly heading: TextHeading1View;

    readonly formView: FormView;
    readonly formGroupContainerView: FormGroupContainerView;
    readonly demoFormGroupInputView: FormGroupInputView;
    readonly demoFormGroupAlertView: FormGroupAlertView;
    readonly demoFormGroupSelectView: FormGroupSelectView;
    readonly demoFormGroupTextAreaView: FormGroupTextAreaView;
    readonly demoFormGroupTextView: FormGroupTextView;
    readonly demoFormGroupDateInputView: FormGroupInputView;
    readonly demoFormGroupTimeInputView: FormGroupInputView;
    readonly demoFormGroupDateTimeInputView: FormGroupDateTimeInputView;
    readonly demoFormGroupTimeSpanInputView: FormGroupTimeSpanInputView;
    readonly demoFormGroupInputWithDataListView: FormGroupInputView;
    readonly demoFormGroupBooleanInputView: FormGroupBooleanInputView;
    readonly demoFormGroupLinkView: FormGroupLinkView;
    readonly demoFormGroupFileInputView: FormGroupInputView;

    readonly showButton: ButtonCommandView;
    readonly alertView: MessageAlertView;
    readonly changeAlertView: MessageAlertView;
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
        this.formGroupContainerView = this.formView.addFormGroupContainer();
        this.demoFormGroupAlertView = this.formGroupContainerView.addFormGroupAlertView();
        this.demoFormGroupBooleanInputView = this.formGroupContainerView.addFormGroupBooleanInputView();
        this.demoFormGroupDateInputView = this.formGroupContainerView.addFormGroupInputView();
        this.demoFormGroupDateTimeInputView = this.formGroupContainerView.addFormGroupDateTimeInputView();
        this.demoFormGroupInputView = this.formGroupContainerView.addFormGroupInputView();
        const changeAlertFormGroupView = this.formGroupContainerView.addFormGroup(FormGroupView);
        this.changeAlertView = changeAlertFormGroupView.valueCell.addView(MessageAlertView);
        this.demoFormGroupInputWithDataListView = this.formGroupContainerView.addFormGroupInputView();
        this.demoFormGroupLinkView = this.formGroupContainerView.addFormGroupLinkView();
        this.demoFormGroupSelectView = this.formGroupContainerView.addFormGroupSelectView();
        this.demoFormGroupTextAreaView = this.formGroupContainerView.addFormGroupTextAreaView();
        this.demoFormGroupTextView = this.formGroupContainerView.addFormGroupTextView();
        this.demoFormGroupTimeInputView = this.formGroupContainerView.addFormGroupInputView();
        this.demoFormGroupTimeSpanInputView = this.formGroupContainerView.addFormGroupTimeSpanInputView();
        this.demoFormGroupFileInputView = this.formGroupContainerView.addFormGroupInputView();
        this.showButton = flexColumn.addView(BlockView).addView(ButtonCommandView);
        this.showButton.setWidth(CssLengthUnit.percentage(50));
        this.showButton.setText('Show Values');
        this.showButton.useOutlineStyle(ContextualClass.primary);
        this.showButton.setMargin(MarginCss.bottom(3));
        this.alertView = flexColumn.addView(MessageAlertView);
        this.valueListView = flexColumn.addListGroup(TextListGroupItemView);
    }
}