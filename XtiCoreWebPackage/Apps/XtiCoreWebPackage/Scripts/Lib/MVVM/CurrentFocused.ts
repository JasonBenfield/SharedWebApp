import { HasFocusProperty, IFocusableViewModel } from "./FocusableComponent";

export class CurrentFocused {
    static readonly value = new CurrentFocused();

    private constructor() { }

    private currentFocused: IFocusableViewModel | null = null;

    blurred(focused: IFocusableViewModel) {
        const currentFocused = this.currentFocused;
        if (currentFocused === focused) {
            this.currentFocused = null;
        }
    }

    focused(focused: IFocusableViewModel) {
        const currentFocused = this.currentFocused;
        if (currentFocused && (!focused.hasFocus || currentFocused !== focused)) {
            currentFocused.hasFocus = new HasFocusProperty(false, false);
            this.currentFocused = null;
        }
        if (focused.hasFocus) {
            this.currentFocused = focused;
        }
        else {
            this.currentFocused = null;
        }
    }
}
