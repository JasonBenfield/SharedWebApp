import { CssLengthUnit } from "../CssLengthUnit";
import { BasicComponentView } from "./BasicComponentView";
import { FormGroupAlertView, FormGroupBooleanInputView, FormGroupDateTimeInputView, FormGroupInputGroupView, FormGroupInputView, FormGroupLinkView, FormGroupPreformattedView, FormGroupSelectView, FormGroupTextAreaView, FormGroupTextView, FormGroupTimeSpanInputView, FormGroupView } from "./FormGroup";
import { GridTemplateCss, GridTemplateCssValue } from "./Grid";
import { ViewConstructor } from "./Types";

export class FormGroupContainerView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('grid');
        this.addCssName('grid-borderless');
        this.addCssName('grid-layout');
        this.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
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

    addFormGroup<T extends FormGroupView>(ctor: ViewConstructor<T>) {
        const formGroupView = this.addView(ctor) as T;
        return formGroupView;
    }

    scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
        this.elementView.scrollIntoView(arg);
    }
}