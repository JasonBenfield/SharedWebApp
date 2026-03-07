import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { CustomEventRegistrations, EventManager } from "./EventManager";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { ITextView, TextChangeHandler, TextComponentView, TextViewModelMixin, TitleChangeHandler, TitleViewMixin, TitleViewModelMixin } from "./TextComponent";
import { ITitleView } from "./Types";

export type BaseCommandView = ComponentView & ICommandView & ITextView & ITitleView;

export class CommandChangeHandler extends ComponentChangeHandler<CommandViewModel, ComponentView & ICommandView> {
    handleChanges(changes: ObservableChanges<CommandViewModel>): void {
        if (changes.text) {
        }
    }

}

export class Command extends Component {
    constructor(
        viewModel: CommandViewModel,
        view: BaseCommandView,
        action: () => Promise<any>
    );
    constructor(
        viewModel: CommandViewModel,
        views: BaseCommandView[],
        action: () => Promise<any>
    );
    constructor(
        protected readonly viewModel: CommandViewModel,
        viewOrViews: BaseCommandView | (BaseCommandView[]),
        private readonly action: () => Promise<any>
    ) {
        const views = Array.isArray(viewOrViews) ? viewOrViews : [viewOrViews];
        super(
            viewModel,
            views,
            new TitleChangeHandler(viewModel, views),
            new TextChangeHandler(viewModel, views)
        );
    }

    setText(text: string) {
        this.viewModel.text = text;
    }

    setTitle(title: string) {
        this.viewModel.title = title;
    }

    async execute() {
        this.viewModel.isInProgress = true;
        try {
            await this.action();
        }
        finally {
            this.viewModel.isInProgress = false;
        }
    }
}

export class CommandViewModel extends TextViewModelMixin(TitleViewModelMixin(ComponentViewModel)) {
    private _isEnabled = false;
    get isEnabled() { return this._isEnabled; }
    set isEnabled(isEnabled: boolean) { this._isEnabled = isEnabled; }

    private _isInProgress = false;
    get isInProgress() { return this._isInProgress; }
    set isInProgress(isInProgress: boolean) { this._isInProgress = isInProgress; }
}

type CommandEventLayout = {
    click: PointerEvent;
}

export interface ICommandView {
    readonly when: CustomEventRegistrations<CommandEventLayout>;
    styleAsInProgress(): void;
    clearStyleAsInProgress(): void;
}

export class ButtonCommandView extends TitleViewMixin(StyleableComponentViewMixin(ComponentView)) implements ICommandView, ITextView {
    private readonly _eventManager = new EventManager<CommandEventLayout>({
        click: null
    });
    private hasRegisteredEvents = false;

    constructor() {
        super("button");
        this.text = this.addChildView(new TextComponentView());
    }

    readonly text: TextComponentView;

    setText(text: string) {
        this.text.setText(text);
    }

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

    simulateClick() {
        const evt = new PointerEvent(
            "pointerup",
            {
                pointerId: 1,
                bubbles: true,
                cancelable: true,
                pointerType: "mouse",
                width: 100,
                height: 100,
                isPrimary: true,
                clientX: 0,
                clientY: 0
            }
        );
        this.simulateEvent(evt);
    }

    styleAsInProgress() {

    }

    clearStyleAsInProgress() {

    }

    private handleClickEvent(evt: PointerEvent) {
        this._eventManager.events.click.invoke(evt);
    }
}