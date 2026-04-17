import { FormControlCss } from "../Bootstrap/FormGroupCss";
import { ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseFormGroupView, FormGroup, FormGroupView, FormGroupViewModel, IFormGroupViewModel } from "./FormGroup";
import { BaseTextComponentView, BaseTextComponentViewModel, ContainerOfTextView, TextComponent, TextComponentView, TextComponentViewModel } from "./TextComponent";

export class FormGroupTextViewModel extends FormGroupViewModel<TextComponentViewModel> {
    constructor() {
        super(new TextComponentViewModel());
    }
}

export class FormGroupTextView extends FormGroupView<TextComponentView> {
    constructor() {
        super(new TextComponentView());
        this.publicLayout.value.setCss(FormControlCss.text());
    }
}

export class FormGroupTextCompositeView<TLayout extends ComponentViewLayout<TLayout>> extends FormGroupView<ContainerOfTextView<TLayout>> {
    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => BaseTextComponentView) {
        super(ContainerOfTextView.block(layout, toPublicLayout));
        this.publicLayout.value.setCss(this.formControlCss);
    }

    private readonly formControlCss = FormControlCss.text();
}

export class FormGroupText extends FormGroup<BaseTextComponentViewModel, BaseTextComponentView, TextComponent> {
    constructor(viewModel: ComponentViewModel & IFormGroupViewModel<BaseTextComponentViewModel>, view: BaseFormGroupView<BaseTextComponentView>) {
        super(viewModel, view, (vm, v) => new TextComponent(vm, v));
    }

    getValue() {
        return this.value.text;
    }

    setValue(value: string) {
        this.value.text = value;
    }
}
