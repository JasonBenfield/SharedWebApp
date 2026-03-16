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
        if (changes.isEnabled || changes.isInProgress) {
            const isEnabled = this.viewModel.isEnabled && !this.viewModel.isInProgress;
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

type CommandAction = () => Promise<any>;

export interface ICommandOptions {
    viewModel: CommandViewModel,
    views: BaseCommandView[],
    action: CommandAction
}

export class CommandOptionsBuilder {
    private readonly views: BaseCommandView[] = [];
    private action: () => Promise<any> = async () => { };

    constructor(private readonly viewModel: CommandViewModel) {
    }

    addView(view: BaseCommandView) {
        this.addViews(view);
        return this;
    }

    addViews(...views: BaseCommandView[]) {
        this.views.push(...views);
        return this;
    }

    setAction(action: () => Promise<any>) {
        this.action = action;
        return this;
    }

    build() {
        const options: ICommandOptions = {
            viewModel: this.viewModel,
            views: this.views,
            action: this.action
        };
        return options;
    }
}

export class Command extends Component {
    declare protected readonly viewModel: CommandViewModel;
    private readonly action: CommandAction;

    constructor(options: ICommandOptions) {
        const viewModel = options.viewModel;
        const views = options.views;
        super(
            viewModel,
            views,
            new TitleChangeHandler(viewModel, views),
            new TextChangeHandler(viewModel, views),
            new CommandChangeHandler(viewModel, views)
        );
        this.action = options.action;
        for (const view of views) {
            view.when.clicked.then(this.onClick.bind(this));
        }
    }

    private onClick() {
        this.execute();
    }

    setText(text: string) {
        this.viewModel.text = text;
    }

    setTitle(title: string) {
        this.viewModel.title = title;
    }

    async execute() {
        if (!this.viewModel.isInProgress) {
            this.viewModel.isInProgress = true;
            try {
                await this.action();
            }
            finally {
                this.viewModel.isInProgress = false;
            }
        }
    }
}

export class CommandViewModel extends TextViewModelMixin(TitleViewModelMixin(ComponentViewModel)) {
    private _isEnabled = true;
    get isEnabled() { return this._isEnabled; }
    set isEnabled(isEnabled: boolean) { this._isEnabled = isEnabled; }

    private _isInProgress = false;
    get isInProgress() { return this._isInProgress; }
    set isInProgress(isInProgress: boolean) { this._isInProgress = isInProgress; }
}

type CommandEventLayout = {
    clicked: PointerEvent;
}

export interface ICommandView {
    readonly when: CustomEventRegistrations<CommandEventLayout>;
    enable(): void;
    disable(): void;
    styleAsInProgress(): void;
    clearStyleAsInProgress(): void;
}

export class ButtonCommandView extends TitleViewMixin(StyleableComponentViewMixin(ComponentView)) implements ICommandView, ITextView {
    private readonly _eventManager = new EventManager<CommandEventLayout>({
        clicked: null
    });
    private hasRegisteredEvents = false;
    private isEnabled = true;

    constructor() {
        super("button");
        this.text = this.addChildView(new TextComponentView());
    }

    readonly text: TextComponentView;

    protected addToDom(index: number) {
        super.addToDom(index);
        const element = this.element as HTMLButtonElement;
        if (element && !this.isEnabled) {
            element.disabled = true;
        }
    }

    setText(text: string) {
        this.text.setText(text);
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

    get when() {
        if (!this.hasRegisteredEvents) {
            this.setEventListener(
                "click",
                this.handleClickEvent.bind(this) as any
            );
            this.hasRegisteredEvents = true;
        }
        return this._eventManager.when;
    }

    simulateClick() {
        const element = this.element as HTMLButtonElement;
        if (element && !element.disabled) {
            element.click();
        }
    }

    styleAsInProgress() {

    }

    clearStyleAsInProgress() {

    }

    private handleClickEvent(evt: PointerEvent) {
        this._eventManager.events.clicked.invoke(evt);
    }
}