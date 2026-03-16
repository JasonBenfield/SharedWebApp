import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { CurrentFocused } from "./CurrentFocused";
import { IEquatable } from "./Equatable";
import { Constructor } from "./Types";

export interface IFocusableViewModel {
    get hasFocus(): HasFocusProperty;
    set hasFocus(hasFocus: HasFocusProperty);
}

export class HasFocusProperty implements IEquatable {
    constructor(readonly value: boolean, readonly isFromUI: boolean) {
    }

    equals(other: HasFocusProperty) {
        let result: boolean;
        if (other) {
            result = this.value === other.value && this.isFromUI === other.isFromUI;
        }
        else {
            result = false;
        }
        return result;
    }

    toString() {
        return `value: '${this.value}', isFromUI: ${this.isFromUI}`;
    }
}

export function FocusableViewModelMixin<T extends Constructor<ComponentViewModel>>(Base: T) {
    return class extends Base implements IFocusableViewModel {
        private _hasFocus = new HasFocusProperty(false, false);
        get hasFocus() { return this._hasFocus; }
        set hasFocus(hasFocus: HasFocusProperty) { this._hasFocus = hasFocus; }
    };
}

export interface IFocusableView {
    setFocus(): void;
    blur(): void;
}

export function FocusableViewMixin<T extends Constructor<ComponentView>>(Base: T) {
    return class extends Base implements IFocusableView {
        private hasFocus = false;

        protected addToDom(index: number) {
            super.addToDom(index);
            const element = this.element;
            if (this.hasFocus && element) {
                element.focus();
            }
        }

        setFocus() {
            this.hasFocus = true;
            const element = this.element;
            if (element) {
                element.focus();
            }
        }

        blur() {
            this.hasFocus = false;
            const element = this.element;
            if (element) {
                element.blur();
            }
        }
    };
}

export interface IFocusableComponent {
    get hasFocus(): boolean;
    setFocus(): void;
    blur(): void;
}

export function FocusableComponentMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base implements IFocusableComponent {
        declare protected readonly viewModel: ComponentViewModel & IFocusableViewModel;

        get hasFocus() { return this.viewModel.hasFocus.value; }

        setFocus() {
            this.viewModel.hasFocus = new HasFocusProperty(true, false);
        }

        blur() {
            this.viewModel.hasFocus = new HasFocusProperty(false, false);
        }

        dispose() {
            this.blur();
            super.dispose();
        }
    };
}

export class FocusableComponentChangeHandler extends ComponentChangeHandler<ComponentViewModel & IFocusableViewModel, ComponentView & IFocusableView> {
    constructor(viewModel: ComponentViewModel & IFocusableViewModel, view: ComponentView & IFocusableView) {
        super(viewModel, view);
    }

    handleChanges(changes: ObservableChanges<ComponentViewModel & IFocusableViewModel>) {
        if (changes.hasFocus) {
            const hasFocus: HasFocusProperty = changes.hasFocus.value;
            if (!hasFocus.isFromUI) {
                if (hasFocus.value) {
                    this.updateView(v => v.setFocus());
                    CurrentFocused.value.focused(this.viewModel);
                }
                else {
                    this.updateView(v => v.blur());
                    CurrentFocused.value.blurred(this.viewModel);
                }
            }
        }
    }
}