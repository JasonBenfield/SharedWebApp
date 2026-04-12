import { ButtonCss } from "../Bootstrap/ButtonCss";
import { ContextualClass } from "../Bootstrap/ContextualClass";
import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { CustomEventRegistrations } from "./EventManager";
import { StyleableComponentView } from "./StyleableComponentView";
import { TitleViewModelMixin } from "./TextComponent";
import { Constructor } from "./Types";

export interface IButtonComponentViewModel {
    get isEnabled(): boolean;
    set isEnabled(isEnabled: boolean);
}

export type BaseButtonComponentViewModel = ComponentViewModel & IButtonComponentViewModel;

export function ButtonComponentViewModelMixin<T extends Constructor<ComponentViewModel>>(Base: T) {
    return class extends Base implements IButtonComponentViewModel {
        private _isEnabled = true;
        get isEnabled() { return this._isEnabled; }
        set isEnabled(isEnabled: boolean) { this._isEnabled = isEnabled; }
    }
}

export class ButtonComponentViewModel extends ButtonComponentViewModelMixin(TitleViewModelMixin(ComponentViewModel)) {
}

export type ButtonViewEventLayout = {
    clicked: PointerEvent;
}

export interface IButtonView {
    readonly when: CustomEventRegistrations<ButtonViewEventLayout>;
    enable(): void;
    disable(): void;
}

export type BaseButtonComponentView = ComponentView & IButtonView;

export function ButtonViewMixin<T extends Constructor<StyleableComponentView>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
            this.setCss(this.buttonCss);
        }

        private isEnabled = true;
        private readonly buttonCss = ButtonCss.solid(ContextualClass.default);

        private readonly buttonEvents = this.eventManager.addEvents<ButtonViewEventLayout>({
            clicked: null
        });
        private hasRegisteredButtonEvents = false;

        get when() {
            if (!this.hasRegisteredButtonEvents) {
                this.setEventListener(
                    "click",
                    this.handleClickEvent.bind(this) as any
                );
                this.hasRegisteredButtonEvents = true;
            }
            return this.buttonEvents.when;
        }

        private handleClickEvent(evt: PointerEvent) {
            this.buttonEvents.events.clicked.invoke(evt);
        }

        simulateClick() {
            const element = this.element as HTMLButtonElement;
            if (element && !element.disabled) {
                element.click();
            }
        }

        setContext(context: ContextualClass) {
            return this.setButtonCss(css => css.context(context));
        }

        styleAsOutline(context?: ContextualClass) {
            return this.setButtonCss(css => {
                css.outline();
                if (context) {
                    css.context(context);
                }
            });
        }

        styleAsSolid(context?: ContextualClass) {
            return this.setButtonCss(css => {
                css.solid();
                if (context) {
                    css.context(context);
                }
            });
        }

        makeLarge() {
            return this.setButtonCss(css => css.large());
        }

        makeSmall() {
            return this.setButtonCss(css => css.small());
        }

        makeNormalSize() {
            return this.setButtonCss(css => css.normalSize());
        }

        protected setButtonCss(configure: (css: ButtonCss) => void) {
            configure(this.buttonCss);
            return this.setCss(this.buttonCss);

        }

        setType(type: "submit" | "button" | "reset") {
            this.setAttributes({ "type": type });
        }

        protected addToDom(index: number) {
            super.addToDom(index);
            const element = this.element as HTMLButtonElement;
            if (element && !this.isEnabled) {
                element.disabled = true;
            }
        }

        enable() {
            this.isEnabled = true;
            const element = this.element as HTMLButtonElement;
            if (element) {
                element.disabled = false;
            }
        }

        disable() {
            this.isEnabled = false;
            const element = this.element as HTMLButtonElement;
            if (element) {
                element.disabled = true;
            }
        }

    };
}

export class ButtonView<
    TLayout extends ComponentViewLayout<TLayout>,
    TPublicLayout extends ComponentViewLayout<TPublicLayout>
> extends ButtonViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
    static create<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return ButtonView.createWithPublicLayout(layout, l => l);
    }

    static createWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ButtonView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("button", layout, toPublicLayout);
    }

    declare asLayout: () => ButtonView<TLayout, TPublicLayout> & TLayout;
}

export function ButtonComponentMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base {
        declare protected readonly viewModel: BaseButtonComponentViewModel;

        get isEnabled() { return this.viewModel.isEnabled; }

        enable() { this.viewModel.isEnabled = true; }

        disable() { this.viewModel.isEnabled = false; }
    }
}

export class ButtonComponentChangeHandler extends ComponentChangeHandler<BaseButtonComponentViewModel, BaseButtonComponentView> {
    handleChanges(changes: ObservableChanges<BaseButtonComponentViewModel>): void {
        if (changes.isEnabled) {
            const isEnabled = this.viewModel.isEnabled;
            this.updateView(v => {
                if (isEnabled) {
                    v.enable();
                }
                else {
                    v.disable();
                }
            });
        }
    }
}

export class ButtonComponent extends ButtonComponentMixin(Component) {
    constructor(viewModel: BaseButtonComponentViewModel, view: BaseButtonComponentView) {
        super(viewModel, view, new ButtonComponentChangeHandler(viewModel, view));
    }
}