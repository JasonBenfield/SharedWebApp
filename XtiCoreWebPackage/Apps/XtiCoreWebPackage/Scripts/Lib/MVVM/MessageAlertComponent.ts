import { AlertHeadingCss } from "../Bootstrap/AlertCss";
import { ContextualClass } from "../Bootstrap/ContextualClass";
import { AlertComponentChangeHandler, AlertComponentMixin, AlertViewMixin, AlertViewModelMixin, IAlertComponent, IAlertView, IAlertViewModel } from "./AlertComponent";
import { Component } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { StyleableComponentView } from "./StyleableComponentView";
import { BaseTextComponentView, TextComponent, TextComponentView, TextComponentViewModel } from "./TextComponent";

export class MessageAlertComponentViewModel
    extends AlertViewModelMixin(ComponentViewModel)
    implements IAlertViewModel {

    readonly heading = new TextComponentViewModel();
    readonly message = new TextComponentViewModel();
}

export interface IMessageAlertView {
    get heading(): BaseTextComponentView;
    get message(): BaseTextComponentView;
}

export type BaseMessageAlertComponentView = ComponentView & IAlertView & IMessageAlertView;

export class MessageAlertComponentView
    extends AlertViewMixin(StyleableComponentView)
    implements IAlertView, IMessageAlertView {

    constructor() {
        super();
        this.layout.heading.setCss(new AlertHeadingCss());
        this.addLayout(this.layout);
    }

    private readonly layout = {
        heading: TextComponentView.heading(4),
        message: TextComponentView.block()
    };

    get heading() { return this.layout.heading; }

    get message() { return this.layout.message; }
}

export class ContainerOfMessageAlertView<TLayout extends ComponentViewLayout<TLayout>>
    extends BaseCompositeComponentView<TLayout, BaseMessageAlertComponentView>
    implements IAlertView, IMessageAlertView {

    static block<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseMessageAlertComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfMessageAlertView(
            "div", layout, toPublicLayout
        ).asLayout();
    }

    static paragraph<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseMessageAlertComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfMessageAlertView(
            "p", layout, toPublicLayout
        ).asLayout();
    }

    static span<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseMessageAlertComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfMessageAlertView(
            "span", layout, toPublicLayout
        ).asLayout();
    }

    declare asLayout: () => ContainerOfMessageAlertView<TLayout> & TLayout;

    get heading() { return this.publicLayout.heading; }
    get message() { return this.publicLayout.message; }

    setContext(context: ContextualClass) {
        this.publicLayout.setContext(context);
    }
}

export class MessageAlertComponent
    extends AlertComponentMixin(Component)
    implements IAlertComponent {
    constructor(protected readonly viewModel: MessageAlertComponentViewModel, view: BaseMessageAlertComponentView) {
        super(viewModel, view, new AlertComponentChangeHandler(viewModel, view));
        const layout = this.addLayout({
            heading: new TextComponent(viewModel.heading, view.heading),
            message: new TextComponent(viewModel.message, view.message)
        });
        this.heading = layout.heading;
        this.message = layout.message;
        this.updateVisibility();
    }

    private readonly heading: TextComponent;
    private readonly message: TextComponent;
    private isAutoScrollEnabled = false;

    primary(message: string, heading?: string) {
        this.setContext(ContextualClass.primary, message, heading);
    }

    secondary(message: string, heading?: string) {
        this.setContext(ContextualClass.secondary, message, heading);
    }

    danger(message: string, heading?: string) {
        this.setContext(ContextualClass.danger, message, heading);
    }

    warning(message: string, heading?: string) {
        this.setContext(ContextualClass.warning, message, heading);
    }

    success(message: string, heading?: string) {
        this.setContext(ContextualClass.success, message, heading);
    }

    async infoAction<TResult>(message: string, a: () => Promise<TResult>, heading?: string) {
        let result: TResult;
        this.info(message, heading);
        try {
            result = await a();
        }
        finally {
            this.clear();
        }
        return result;
    }

    info(message: string, heading?: string) {
        this.setContext(ContextualClass.info, message, heading);
    }

    dark(message: string, heading?: string) {
        this.setContext(ContextualClass.dark, message, heading);
    }

    light(message: string, heading?: string) {
        this.setContext(ContextualClass.light, message, heading);
    }

    private setContext(context: ContextualClass, message: string, heading?: string) {
        this.context = context;
        this.message.text = message;
        if (heading !== undefined) {
            this.heading.text = heading;
        }
        this.updateVisibility();
    }

    setHeading(heading: string) {
        this.heading.text = heading;
        this.updateVisibility();
    }

    setMessage(message: string) {
        this.message.text = message;
        this.updateVisibility();
    }

    clear() {
        this.heading.text = "";
        this.message.text = "";
        this.updateVisibility();
    }

    enableAutoScrollIntoView() {
        this.isAutoScrollEnabled = true;
    }

    disableAutoScrollIntoView() {
        this.isAutoScrollEnabled = false;
    }

    private updateVisibility() {
        if (this.message.text || this.heading.text) {
            this.show();
            if (this.isAutoScrollEnabled) {
                this.scrollIntoView();
            }
        }
        else {
            this.viewModel.isScrolledIntoView = false;
            this.hide();
        }
    }
}