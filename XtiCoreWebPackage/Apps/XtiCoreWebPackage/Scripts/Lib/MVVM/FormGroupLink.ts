import { FormControlCss } from "../Bootstrap/FormGroupCss";
import { ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseFormGroupView, FormGroup, FormGroupView, FormGroupViewModel, IFormGroupViewModel } from "./FormGroup";
import { BaseLinkComponentView, BaseLinkComponentViewModel, LinkComponent, LinkComponentViewModel } from "./LinkComponent";
import { LinkCompositeComponentView } from "./LinkCompositeComponent";
import { BaseTextComponentView } from "./TextComponent";
import { BaseTextLinkComponentView, BaseTextLinkComponentViewModel, ContainerOfTextLinkView, LinkContainerOfTextView, TextLinkComponent, TextLinkComponentView, TextLinkComponentViewModel } from "./TextLinkComponent";

export class FormGroupLinkViewModel extends FormGroupViewModel<LinkComponentViewModel> {
    constructor() {
        super(new LinkComponentViewModel());
    }
}

export class FormGroupLinkView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>> extends FormGroupView<LinkCompositeComponentView<TLayout, TPublicLayout>> {
    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(new LinkCompositeComponentView(layout, toPublicLayout));
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

export class FormGroupContainerOfTextLinkView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView> extends FormGroupView<ContainerOfTextLinkView<TLayout>> {
    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(ContainerOfTextLinkView.block(layout, toPublicLayout));
        this.publicLayout.value.setCss(FormControlCss.link());
    }
}

export class FormGroupLinkContainerOfTextView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView> extends FormGroupView<LinkContainerOfTextView<TLayout>> {
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
