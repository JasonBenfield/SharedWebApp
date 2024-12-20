﻿import { FaIconAnimation, FaIconView } from "../Views/FaIconView";
import { CommandView } from "../Views/Types";

export type CommandAction = (context?: any) => any;

export class AsyncCommand {
    private readonly items: CommandView[] = [];
    private isMultiExecutionAllowed = false;
    private isEnabled = true;
    private executionCount = 0;
    private inProgressAnimation: FaIconAnimation = null;

    constructor(private readonly action: CommandAction) {
    }

    configure(action: (c: AsyncCommand) => void) {
        action(this);
        return this;
    }

    add(item: CommandView) {
        this.items.push(item);
        item.handleClick(() => this.execute());
        return item;
    }

    remove(item: CommandView) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            item.dispose();
            this.items.splice(index, 1);
        }
        return item;
    }

    animateIconWhenInProgress(inProgressAnimation: FaIconAnimation) {
        this.inProgressAnimation = inProgressAnimation;
    }

    activate() {
        this.forEachItem(c => {
            if ("setActive" in c) {
                c.setActive();
            }
        });
    }

    deactivate() {
        this.forEachItem(c => {
            if ("setInactive" in c) {
                c.setInactive();
            }
        });
    }

    private forEachItem(action: (item: CommandView) => void) {
        for (const item of this.items) {
            action(item);
        }
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
        this.isEnabled = false;
        this.updateIsEnabled();
    }

    private updateIsEnabled() {
        const isEnabled = this.isEnabled && this.executionCount === 0;
        if (isEnabled) {
            this.forEachItem(c => c.enable());
        }
        else {
            this.forEachItem(c => c.disable());
        }
    }

    setText(text: string) {
        this.forEachItem(c => c.setText(text));
    }

    setTitle(title: string) {
        this.forEachItem(c => c.setTitle(title));
    }

    async execute() {
        const canExecute = this.canExecute();
        if (canExecute) {
            this.executionCount++;
            if (this.inProgressAnimation) {
                this.icons(i => {
                    i.startAnimation(this.inProgressAnimation);
                });
            }
            this.updateIsEnabled();
            try {
                await this.action();
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

    private icons(action: (i: FaIconView) => void) {
        this.forEachItem(c => {
            if ("icon" in c) {
                action(c.icon);
            }
        });
    }

    dispose() {
        for (const item of this.items) {
            item.dispose();
        }
        this.items.splice(0, this.items.length);
    }
}

export class Command extends AsyncCommand {
    constructor(action: (context?: any) => void) {
        super((c?: any) => {
            return new Promise<any>((resolve, reject) => {
                try {
                    action(c);
                    resolve({});
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
}
