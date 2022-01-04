import { FaIcon, FaIconAnimation } from "../FaIcon";
import { ButtonViewModel } from "../Html/ButtonViewModel";
import { ButtonCommandItem } from "./ButtonCommandItem";
import { ICommandItem } from "./CommandItem";

export type CommandAction = (context?: any) => any;

export class AsyncCommand {
    constructor(private readonly action: CommandAction) {
    }

    configure(action: (c: AsyncCommand) => void) {
        action(this);
        return this;
    }

    private readonly items: ICommandItem[] = [];

    addButton(vm: ButtonViewModel) {
        return this.add(new ButtonCommandItem(vm));
    }

    add<T extends ICommandItem>(item: T) {
        this.items.push(item);
        item.executeRequested.register(context => this.execute(context));
        return item;
    }

    private isMultiExecutionAllowed = false;
    private isEnabled = true;
    private executionCount = 0;

    private inProgressAnimation: FaIconAnimation = null;

    animateIconWhenInProgress(inProgressAnimation: FaIconAnimation) {
        this.inProgressAnimation = inProgressAnimation;
    }

    private icons(action: (i: FaIcon) => void) {
        this.forEachItem(c => {
            action(c.icon);
        });
    }

    private forEachItem(action: (item: ICommandItem) => void) {
        for (let item of this.items) {
            action(item);
        }
    }

    activate() {
        this.forEachItem(c => c.setActive());
    }

    deactivate() {
        this.forEachItem(c => c.setInactive());
    }

    allowMultiExecution() {
        this.isMultiExecutionAllowed = true;
    }

    show() {
        this.forEachItem(c => c.show());
    }

    hide() {
        this.forEachItem(c => c.hide());
    }

    enable() {
        this.isEnabled = true;
        this.updateIsEnabled();
    }

    disable() {
        this.updateIsEnabled();
    }

    private updateIsEnabled() {
        let isEnabled = this.isEnabled && this.executionCount === 0;
        if (isEnabled) {
            this.forEachItem(c => c.enable());
        }
        else {
            this.forEachItem(c => c.disable());
        }
    }

    async execute(context?: any) {
        let canExecute = this.canExecute();
        if (canExecute) {
            this.executionCount++;
            if (this.inProgressAnimation) {
                this.icons(i => {
                    i.startAnimation(this.inProgressAnimation);
                });
            }
            this.updateIsEnabled();
            try {
                await this.action(context);
            }
            finally {
                this.executionCount--;
                this.updateIsEnabled();
                if (this.inProgressAnimation) {
                    this.icons(i => {
                        i.stopAnimation();
                    });
                }
            }
        }
    }

    private canExecute() {
        return this.isEnabled && (this.isMultiExecutionAllowed || this.executionCount === 0);
    }
}
