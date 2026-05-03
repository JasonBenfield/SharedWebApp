import { AlertCss } from "../Bootstrap/AlertCss";
import { ContextualClass } from "../Bootstrap/ContextualClass";
import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { IStyleableComponentView } from "./StyleableComponentView";
import { Constructor } from "./Types";

export interface IAlertViewModel {
    get context(): ContextualClass;
    set context(context: ContextualClass);
}

export type BaseAlertComponentViewModel = ComponentViewModel & IAlertViewModel;

export function AlertViewModelMixin<T extends Constructor<ComponentViewModel>>(Base: T): T & Constructor<IAlertViewModel> {
    return class extends Base {
        private _context = ContextualClass.default;
        get context() { return this._context; }
        set context(context: ContextualClass) { this._context = context; }
    };
}

export class AlertComponentViewModel
    extends AlertViewModelMixin(ComponentViewModel)
    implements IAlertViewModel {
}

export interface IAlertView {
    setContext(context: ContextualClass): void;
}

export type BaseAlertComponentView = ComponentView & IAlertView;

export function AlertViewMixin<T extends Constructor<ComponentView & IStyleableComponentView>>(Base: T): T & Constructor<IAlertView> {
    return class extends Base {
        private readonly alertCss = new AlertCss();

        setContext(context: ContextualClass) {
            this.alertCss.context(context);
            this.setCss(this.alertCss);
        }
    };
}
export class AlertComponentView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>
    extends AlertViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout>
    implements IAlertView {
    static block<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return AlertComponentView.blockWithPublicLayout(layout, l => l);
    }

    static blockWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new AlertComponentView("div", layout, toPublicLayout).asLayout();
    }
}

export class AlertComponentChangeHandler extends ComponentChangeHandler<BaseAlertComponentViewModel, BaseAlertComponentView> {
    handleChanges(changes: ObservableChanges<BaseAlertComponentViewModel>) {
        if (changes.context) {
            const context = changes.context.value;
            this.updateView(v => v.setContext(context));
        }
    }
}

export interface IAlertComponent {
    get context(): ContextualClass;
    set context(context: ContextualClass);


    setContextToPrimary(): void;

    setContextToSecondary(): void;

    setContextToDanger(): void;

    setContextToWarning(): void;

    setContextToInfo(): void;

    setContextToSuccess(): void;

    setContextToDark(): void;

    setContextToLight(): void;
}

export function AlertComponentMixin<T extends Constructor<Component>>(Base: T): T & Constructor<IAlertComponent> {
    return class extends Base {
        declare protected readonly viewModel: BaseAlertComponentViewModel;

        get context() { return this.viewModel.context; }
        set context(context: ContextualClass) { this.viewModel.context = context; }

        setContextToPrimary() { this.context = ContextualClass.primary; }

        setContextToSecondary() { this.context = ContextualClass.secondary; }

        setContextToDanger() { this.context = ContextualClass.danger; }

        setContextToWarning() { this.context = ContextualClass.warning; }

        setContextToInfo() { this.context = ContextualClass.info; }

        setContextToSuccess() { this.context = ContextualClass.success; }

        setContextToDark() { this.context = ContextualClass.dark; }

        setContextToLight() { this.context = ContextualClass.light; }
    };
}

export class AlertComponent extends AlertComponentMixin(Component) {
    constructor(protected readonly viewModel: BaseAlertComponentViewModel, view: BaseAlertComponentView) {
        super(
            viewModel,
            view,
            new AlertComponentChangeHandler(viewModel, view)
        );
    }
}
