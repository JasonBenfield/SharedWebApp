import { FormControlCss, FormLabelCss } from "../Bootstrap/FormGroupCss";
import { CssClass } from "../CssClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { Component } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseCompositeComponentView, ICompositeComponentView } from "./CompositeComponent";
import { GridCellView, GridRowViewMixin, GridViewMixin } from "./GridView";
import { BaseInputComponentView, InputComponent, InputComponentView, InputComponentViewModel } from "./InputComponent";
import { BaseLinkComponentView, BaseLinkComponentViewModel, LinkComponent, LinkComponentView, LinkComponentViewModel } from "./LinkComponent";
import { IStyleableComponentView } from "./StyleableComponentView";
import { BaseTextComponentView, BaseTextComponentViewModel, ContainerOfTextView, TextComponent, TextComponentView, TextComponentViewModel } from "./TextComponent";
import { BaseTextLabelComponentView, BaseTextLabelComponentViewModel, TextLabelComponent, TextLabelComponentView, TextLabelComponentViewModel } from "./TextLabelComponent";
import { BaseTextLinkComponentView, BaseTextLinkComponentViewModel, ContainerOfTextLinkView, LinkContainerOfTextView, TextLinkComponent, TextLinkComponentView, TextLinkComponentViewModel } from "./TextLinkComponent";
import { ITransformedInput, TransformedInputComponent, TransformedInputComponentViewModel } from "./TransformedInputComponent";

interface IFormGroupViewLayout<TValueView extends ComponentView> {
    captionCell: ComponentView & {
        caption: BaseTextLabelComponentView & IStyleableComponentView
    },
    valueCell: ComponentView & {
        value: TValueView
    }
};

export interface IFormGroupViewPublicLayout<TValueView extends ComponentView> {
    readonly caption: BaseTextLabelComponentView & IStyleableComponentView;
    readonly value: TValueView;
}

export type BaseFormGroupView<TValueView extends ComponentView> = ComponentView & { publicLayout: IFormGroupViewPublicLayout<TValueView> };

class FormGroupCss extends CssClass {
    protected buildCss() {
        return "form-group";
    }
}

class FormGroupCaptionCellCss extends CssClass {
    protected buildCss() {
        return "form-group-caption-cell";
    }
}

export class FormGroupView<TValueView extends ComponentView> extends GridRowViewMixin(BaseCompositeComponentView)<IFormGroupViewLayout<TValueView>, IFormGroupViewPublicLayout<TValueView>> implements ICompositeComponentView<IFormGroupViewLayout<TValueView>, IFormGroupViewPublicLayout<TValueView>> {

    constructor(valueView: TValueView) {
        const layout = {
            captionCell: GridCellView.block({
                caption: new TextLabelComponentView()
            }),
            valueCell: GridCellView.block({
                value: valueView
            })
        };
        super(
            "div",
            layout,
            l => {
                return {
                    caption: l.captionCell.caption,
                    value: l.valueCell.value
                };
            }
        );
        this.setCss(new FormGroupCss());
        layout.captionCell.setCss(new FormGroupCaptionCellCss());
        this.publicLayout.caption.setCss(new FormLabelCss());
    }
}

export interface IFormGroupViewModel<TValue extends ComponentViewModel> {
    caption: BaseTextLabelComponentViewModel,
    value: TValue
}

export class FormGroupViewModel<TValueVM extends ComponentViewModel> extends ComponentViewModel implements IFormGroupViewModel<TValueVM> {
    constructor(value: TValueVM) {
        super();
        this.value = value;
    }

    readonly caption = new TextLabelComponentViewModel();
    readonly value: TValueVM;
}

export class FormGroup<
    TValueVM extends ComponentViewModel,
    TValueView extends ComponentView,
    TValueComponent extends Component
> extends Component {
    constructor(
        viewModel: ComponentViewModel & IFormGroupViewModel<TValueVM>,
        view: BaseFormGroupView<TValueView>,
        createValueComponent: (vm: TValueVM, v: TValueView) => TValueComponent
    ) {
        super(viewModel, view);
        this.caption = new TextLabelComponent(viewModel.caption, view.publicLayout.caption);
        this.value = createValueComponent(viewModel.value, view.publicLayout.value);
        const value: any = this.value;
        if (value.id && typeof value.id === "string") {
            this.caption.forComponent(value);
        }
    }

    readonly caption: TextLabelComponent;
    readonly value: TValueComponent;

    setCaption(caption: string) {
        this.caption.text = caption;
    }

}

type FormGroupEventLayout<TValue> = {
    valueChanged: TValue
}

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

export class FormGroupLinkViewModel extends FormGroupViewModel<LinkComponentViewModel> {
    constructor() {
        super(new LinkComponentViewModel());
    }
}

export class FormGroupLinkView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>> extends FormGroupView<LinkComponentView<TLayout, TPublicLayout>> {
    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(new LinkComponentView(layout, toPublicLayout));
        this.publicLayout.value.setCss(FormControlCss.link());
    }
}

export class FormGroupLink extends FormGroup<BaseLinkComponentViewModel, BaseLinkComponentView, LinkComponent> {
    constructor(protected readonly viewModel: ComponentViewModel & IFormGroupViewModel<BaseLinkComponentViewModel>, view: BaseFormGroupView<BaseLinkComponentView>) {
        super(viewModel, view, (vm, v) => new LinkComponent(vm, v));
    }

    getHref() { return this.viewModel.value.href; }

    setHref(href: string) { this.viewModel.value.href = href; }
}

export class FormGroupTextLinkViewModel extends FormGroupViewModel<TextLinkComponentViewModel> {
    constructor() {
        super(new TextLinkComponentViewModel());
    }
}

export class FormGroupTextLinkView extends FormGroupView<TextLinkComponentView> {
    constructor() {
        super(new TextLinkComponentView());
        this.publicLayout.value.setCss(FormControlCss.link());
    }
}

export class FormGroupTextLinkCompositeView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView> extends FormGroupView<ContainerOfTextLinkView<TLayout>> {
    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(ContainerOfTextLinkView.block(layout, toPublicLayout));
        this.publicLayout.value.setCss(FormControlCss.link());
    }
}

export class FormGroupLinkWithTextView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView> extends FormGroupView<LinkContainerOfTextView<TLayout>> {
    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(LinkContainerOfTextView.create(layout, toPublicLayout));
        this.publicLayout.value.setCss(FormControlCss.link());
    }
}

export class FormGroupTextLink extends FormGroup<BaseTextLinkComponentViewModel, BaseTextLinkComponentView, TextLinkComponent> {
    constructor(protected readonly viewModel: ComponentViewModel & IFormGroupViewModel<BaseTextLinkComponentViewModel>, view: BaseFormGroupView<BaseTextLinkComponentView>) {
        super(viewModel, view, (vm, v) => new TextLinkComponent(vm, v));
    }

    getHref() { return this.viewModel.value.href; }

    setHref(href: string) { this.viewModel.value.href = href; }

    getText() { return this.viewModel.value.text; }

    setText(text: string) { this.viewModel.value.text = text; }
}

export class FormGroupInputViewModel extends FormGroupViewModel<InputComponentViewModel> {
    constructor() {
        super(new InputComponentViewModel());
    }
}

export class FormGroupInputView extends FormGroupView<InputComponentView> {
    constructor() {
        super(new InputComponentView());
        this.publicLayout.value.setCss(this.formControlCss);
    }

    private readonly formControlCss = new FormControlCss();

    setFormControlCss(configure: (css: FormControlCss) => void) {
        configure(this.formControlCss);
        this.publicLayout.value.setCss(this.formControlCss);
        return this;
    }
}

export class FormGroupInput extends FormGroup<InputComponentViewModel, BaseInputComponentView, InputComponent> {
    constructor(viewModel: ComponentViewModel & IFormGroupViewModel<InputComponentViewModel>, view: BaseFormGroupView<BaseInputComponentView>) {
        super(viewModel, view, (vm, v) => new InputComponent(vm, v));
    }


    readonly when = this.value.when;

    getValue() {
        return this.value.textValue;
    }

    setValue(value: string) {
        this.value.textValue = value;
    }

    setFocus() {
        this.value.setFocus();
    }
}

export class FormGroupTransformedInputViewModel<TValue> extends FormGroupViewModel<TransformedInputComponentViewModel<TValue>> {
    constructor(initialValue: TValue) {
        super(new TransformedInputComponentViewModel(initialValue));
    }
}

export class FormGroupTransformedInput<TValue> extends FormGroup<TransformedInputComponentViewModel<TValue>, BaseInputComponentView, TransformedInputComponent<TValue>> {
    constructor(viewModel: ComponentViewModel & IFormGroupViewModel<TransformedInputComponentViewModel<TValue>>, view: BaseFormGroupView<BaseInputComponentView>, transformedInput: ITransformedInput<TValue>) {
        super(viewModel, view, (vm, v) => new TransformedInputComponent(vm, v, transformedInput));
    }

    readonly when = this.value.when;

    getValue() {
        return this.value.value;
    }

    setValue(value: TValue) {
        this.value.value = value;
    }

    setFocus() {
        this.value.setFocus();
    }
}

export type FormGroupContainerViewLayout<T> = {
    [K in keyof T]: BaseFormGroupView<ComponentView>;
}

class FormGroupContainerCss extends CssClass {
    protected buildCss() {
        return "form-group-grid";
    }
}

export class FormGroupContainerView<TLayout extends FormGroupContainerViewLayout<TLayout>> extends GridViewMixin(BaseCompositeComponentView)<TLayout, TLayout> {
    static create<TLayout extends FormGroupContainerViewLayout<TLayout>>(layout: TLayout) {
        return new FormGroupContainerView(layout).asLayout();
    }

    constructor(layout: TLayout) {
        super("div", layout, l => l);
        this.styleAsLayout();
        this.setCss(new FormGroupContainerCss());
        this.setTemplateColumns(
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1)
        );
    }

    addFormGroup<T extends BaseFormGroupView<ComponentView>>(formGroup: T) {
        return this.addChildView(formGroup);
    }
}