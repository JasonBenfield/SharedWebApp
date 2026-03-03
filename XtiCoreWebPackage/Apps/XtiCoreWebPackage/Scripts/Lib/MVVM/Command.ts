import { ComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { CustomEventRegistrations, EventManager } from "./EventManager";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, TextComponentView, TextViewMixin, TextViewModelMixin, TitleViewMixin, TitleViewModelMixin } from "./TextComponent";

export type BaseCommandView = ComponentView & ICommandView;

export class Command {
    private readonly views: BaseCommandView[] = [];

    constructor(private readonly viewModel: CommandViewModel) {
    }

    addView(view: BaseCommandView) {
        this.views.push(view);
    }

    dispose() {
        this.viewModel.dispose();
        const views = this.views.splice(0, this.views.length);
        for (const view of views) {
            view.dispose();
        }
    }
}

export class CommandViewModel extends TextViewModelMixin(TitleViewModelMixin(ComponentViewModel)) {
    private _isEnabled = false;
    get isEnabled() { return this._isEnabled; }
    set isEnabled(isEnabled: boolean) { this._isEnabled = isEnabled; }
}

type CommandEventLayout = {
    click: PointerEvent;
}

export interface ICommandView {
    readonly when: CustomEventRegistrations<CommandEventLayout>;
    readonly text?: BaseTextComponentView;
}

export class ButtonCommandView extends TextViewMixin(TitleViewMixin(StyleableComponentViewMixin(ComponentView))) {
    private readonly _eventManager = new EventManager<CommandEventLayout>({
        click: null
    });
    private hasRegisteredEvents = false;

    constructor() {
        super("button");
        this.text = this.addChildView(new TextComponentView());
    }

    readonly text: TextComponentView;

    enable() {
        this.setAttribute("disabled", null);
    }

    disable() {
        this.setAttribute("disabled", "");
    }

    get when() {
        if (!this.hasRegisteredEvents) {
            this.setEventListener("click", this.handleClickEvent);
            this.hasRegisteredEvents = true;
        }
        return this._eventManager.when;
    }

    private handleClickEvent(evt: PointerEvent) {
        this._eventManager.events.click.invoke(evt);
    }
}