import { CssLengthUnit } from "../CssLengthUnit";
import { BasicComponentView } from "./BasicComponentView";
import { FormGroupAlertView, FormGroupBooleanInputView, FormGroupDateTimeInputView, FormGroupFormCheckView, FormGroupInputGroupView, FormGroupInputView, FormGroupLinkView, FormGroupPreformattedView, FormGroupSelectView, FormGroupTextAreaView, FormGroupTextStackView, FormGroupTextView, FormGroupTimeSpanInputView, FormGroupView } from "./FormGroup";
import { FormGroupGridListGroupView } from "./FormGroupGridListGroupView";
import { GridTemplateCss, GridTemplateCssValue } from "./Grid";
import { GridListGroupItemView } from "./ListGroup";
import { ViewConstructor } from "./Types";

export class FormGroupContainerView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('grid');
        this.addCssName('grid-borderless');
        this.addCssName('grid-layout');
        this.addCssName('form-group-grid');
        //this.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
    }

    setTemplateColumns(...columns: GridTemplateCss[]) {
        const value = new GridTemplateCssValue(...columns).value();
        this.setStyle(style => style['grid-template-columns'] = value);
    }

    configureFormGroups(configure: (fg: FormGroupView) => void) {
        for (const formGroup of this.getViews()) {
            if (formGroup instanceof FormGroupView) {
                configure(formGroup);
            }
        }
    }

    addFormGroupTextView() {
        return this.addFormGroup(FormGroupTextView);
    }

    addFormGroupTextStackView() {
        return this.addFormGroup(FormGroupTextStackView);
    }

    addFormGroupPreformattedView() {
        return this.addFormGroup(FormGroupPreformattedView);
    }

    addFormGroupLinkView() {
        return this.addFormGroup(FormGroupLinkView);
    }

    addFormGroupInputView() {
        return this.addFormGroup(FormGroupInputView);
    }

    addFormGroupTextAreaView() {
        return this.addFormGroup(FormGroupTextAreaView);
    }

    addFormGroupInputGroupView() {
        return this.addFormGroup(FormGroupInputGroupView);
    }

    addFormGroupSelectView() {
        return this.addFormGroup(FormGroupSelectView);
    }

    addFormGroupDateTimeInputView() {
        return this.addFormGroup(FormGroupDateTimeInputView);
    }

    addFormGroupTimeSpanInputView() {
        return this.addFormGroup(FormGroupTimeSpanInputView);
    }

    addFormGroupAlertView() {
        return this.addFormGroup(FormGroupAlertView);
    }

    addFormGroupBooleanInputView() {
        return this.addFormGroup(FormGroupBooleanInputView);
    }

    addFormGroupFormCheckView() {
        return this.addFormGroup(FormGroupFormCheckView);
    }

    addFormGroupGridListGroupView<TItemView extends GridListGroupItemView>(itemCtor: ViewConstructor<TItemView>) {
        return FormGroupGridListGroupView.addTo(this, itemCtor);
    }

    addFormGroup<T extends FormGroupView>(ctor: ViewConstructor<T>) {
        const formGroupView = this.addView(ctor) as T;
        return formGroupView;
    }

    scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
        this.elementView.scrollIntoView(arg);
    }
}