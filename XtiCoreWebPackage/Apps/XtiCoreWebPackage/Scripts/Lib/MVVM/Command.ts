import { ButtonViewMixin } from "./ButtonComponent";
import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { CustomEventRegistrations, EventManager } from "./EventManager";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, ITextView, TextChangeHandler, TextComponentView, TextViewModelMixin, TitleChangeHandler, TitleViewMixin, TitleViewModelMixin } from "./TextComponent";

export class CommandViewModel extends TextViewModelMixin(TitleViewModelMixin(ComponentViewModel)) {
    private _isEnabled = true;
    get isEnabled() { return this._isEnabled; }
    set isEnabled(isEnabled: boolean) { this._isEnabled = isEnabled; }

    private _isInProgress = false;
    get isInProgress() { return this._isInProgress; }
    set isInProgress(isInProgress: boolean) { this._isInProgress = isInProgress; }
}

export interface ICommandView {
    readonly when: CustomEventRegistrations<CommandEventLayout>;
    enable(): void;
    disable(): void;
    styleAsInProgress(): void;
    clearStyleAsInProgress(): void;
}

export type BaseCommandView = BaseTextComponentView & ICommandView;

type CommandEventLayout = {
    clicked: PointerEvent;
}

export class ButtonCommandView extends TitleViewMixin(ButtonViewMixin(StyleableComponentViewMixin(ComponentView))) implements ICommandView, ITextView {
    constructor() {
        super("button");
        this.text = this.addChildView(new TextComponentView());
    }

    readonly text: TextComponentView;

    setText(text: string) {
        this.text.setText(text);
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
}

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

type CommandAction = (() => Promise<any>) | (() => void);

export interface ICommandOptions {
    viewModel: CommandViewModel,
    views: BaseCommandView[],
    action: CommandAction
}

export class CommandOptionsBuilder {
    private readonly views: BaseCommandView[] = [];
    private action: CommandAction = async () => { };

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

    setAction(action: CommandAction) {
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

    declare addView: <TView extends BaseCommandView>(view: TView) => TView;

    private onClick() {
        this.execute();
    }

    setText(text: string) {
        this.viewModel.text = text;
    }

    setTitle(title: string) {
        this.viewModel.title = title;
    }

    get isEnabled() { return this.viewModel.isEnabled; }

    enable() {
        this.viewModel.isEnabled = true;
    }

    disable() {
        this.viewModel.isEnabled = false;
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
