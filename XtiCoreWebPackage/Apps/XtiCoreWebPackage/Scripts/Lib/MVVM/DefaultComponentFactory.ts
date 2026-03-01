import { Component } from "./Component";
import { ComponentFactory, IComponentFactory } from "./ComponentFactory";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { CompositeComponent, CompositeComponentViewModel } from "./CompositeComponent";
import { BaseLinkComponentView, LinkComponent, LinkComponentViewModel } from "./LinkComponent";
import { IReadonlyFormGroupView, ReadonlyFormGroup, ReadonlyFormGroupViewModel } from "./ReadonlyFormGroup";
import { BaseTextComponentView, TextComponent, TextComponentViewModel } from "./TextComponent";
import { BaseTextLinkComponentView, TextLinkComponent, TextLinkComponentViewModel } from "./TextLinkComponent";

export class DefaultComponentFactory {
    private static readonly factory = new ComponentFactory();

    static addFactory(factory: IComponentFactory) {
        DefaultComponentFactory.factory.addFactory(factory);
    }

    create(viewModel: ComponentViewModel, view: ComponentView): Component {
        return DefaultComponentFactory.factory.create(viewModel, view) ||
            this.defaultCreate(viewModel, view);
    }

    private defaultCreate(viewModel: ComponentViewModel, view: ComponentView) {
        return viewModel instanceof TextLinkComponentViewModel ? new TextLinkComponent(viewModel, view as BaseTextLinkComponentView) :
            viewModel instanceof TextComponentViewModel ? new TextComponent(viewModel, view as BaseTextComponentView) :
                viewModel instanceof LinkComponentViewModel ? new LinkComponent(viewModel, view as BaseLinkComponentView) :
                    viewModel instanceof ReadonlyFormGroupViewModel ? new ReadonlyFormGroup(viewModel, view as IComponentView & IReadonlyFormGroupView) :
                        viewModel instanceof CompositeComponentViewModel ? new CompositeComponent(viewModel, view).compose(this) :
                            new Component(viewModel, view);
    }
}