import { ContextualClass } from '../../Lib/ContextualClass';
import { CssLengthUnit } from '../../Lib/CssLengthUnit';
import { MarginCss } from '../../Lib/MarginCss';
import { PaddingCss } from '../../Lib/PaddingCss';
import { BlockView } from '../../Lib/Views/BlockView';
import { ButtonContainerView } from '../../Lib/Views/ButtonContainerView';
import { ButtonCommandView } from '../../Lib/Views/Command';
import { FormGroupAlertView, FormGroupBooleanInputView, FormGroupDateTimeInputView, FormGroupFormCheckView, FormGroupInputView, FormGroupLinkView, FormGroupSelectView, FormGroupTextAreaView, FormGroupTextStackView, FormGroupTextView, FormGroupTimeSpanInputView, FormGroupView } from '../../Lib/Views/FormGroup';
import { FormGroupContainerView } from '../../Lib/Views/FormGroupContainerView';
import { FormGroupGridListGroupView } from '../../Lib/Views/FormGroupGridListGroupView';
import { FormView } from '../../Lib/Views/FormView';
import { ListGroupView, TextListGroupItemView } from '../../Lib/Views/ListGroup';
import { MessageAlertView } from '../../Lib/Views/MessageAlertView';
import { TextHeading1View } from '../../Lib/Views/TextHeadings';
import { TestGridListItemView } from '../CardDemo/TestGridListItemView';
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
    readonly demoFormGroupFormCheckView: FormGroupFormCheckView;
    readonly demoFormGroupTextStackView: FormGroupTextStackView;
    readonly demoFormGroupGridListGroupView: FormGroupGridListGroupView<TestGridListItemView>;

    readonly showButton: ButtonCommandView;
    readonly alertView: MessageAlertView;
    readonly changeAlertView: MessageAlertView;
    readonly valueListView: ListGroupView<TextListGroupItemView>;

    constructor() {
        super();
        const flexColumn = this.addView(BlockView)
            .configure(c => {
                c.height100();
                c.addCssName('container');
                c.positionRelative();
            })
            .addView(BlockView)
            .configure(b => {
                b.positionAbsoluteFill();
                b.scrollable();
            })
            .addView(BlockView)
            .configure(b => {
                b.setPadding(PaddingCss.top(3));
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
        this.demoFormGroupFormCheckView = this.formGroupContainerView.addFormGroupFormCheckView();
        this.demoFormGroupGridListGroupView = this.formGroupContainerView.addFormGroupGridListGroupView(TestGridListItemView);
        this.demoFormGroupTextStackView = this.formGroupContainerView.addFormGroupTextStackView();
        TestGridListItemView.setTemplateColumns(this.demoFormGroupGridListGroupView);
        this.showButton = flexColumn.addView(ButtonContainerView).addButtonCommand();
        this.showButton.setText('Show Values');
        this.showButton.useOutlineStyle(ContextualClass.primary);
        this.showButton.setMargin(MarginCss.bottom(3));
        this.alertView = flexColumn.addView(MessageAlertView);
        this.valueListView = flexColumn.addListGroup(TextListGroupItemView);
    }
}