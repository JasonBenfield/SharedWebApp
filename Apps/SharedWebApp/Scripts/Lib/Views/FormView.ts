﻿import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { ButtonCommandView } from "./Commands";
import { IFormAttributes } from "./Types";

export class FormView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'form');
        this.setAction("#");
    }

    onSubmit() { return this.on('submit'); }

    protected setAttr: (config: (attr: IFormAttributes) => void) => void;

    clearAutocomplete() { this.setAutocomplete(null); }

    setAutocompleteOff() { this.setAutocomplete('off'); }

    setAutocompleteNewPassword() { this.setAutocomplete('new-password'); }

    private setAutocomplete(autocomplete: string) {
        this.setAttr(attr => attr.autocomplete = autocomplete);
    }

    setAction(action: string) { this.setAttr(attr => attr.action = action); }

    setMethod(method: string) { this.setAttr(attr => attr.method = method); }

    addOffscreenSubmit() {
        return this.addView(ButtonCommandView)
            .configure(button => {
                button.makeOffscreenSubmit();
            });
    }
}