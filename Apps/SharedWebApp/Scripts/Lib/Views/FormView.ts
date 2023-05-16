import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { ButtonCommandView } from "./Command";
import { IFormAttributes, TargetValue } from "./Types";

export class FormView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'form');
        this.setAction("#");
        this.setMethod('POST');
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

    setTarget(target: TargetValue) {
        this.setAttr(attr => attr.target = target);
    }

    addOffscreenSubmit() {
        return this.addView(ButtonCommandView)
            .configure(button => {
                button.makeOffscreenSubmit();
            });
    }

    submit() {
        const form = this.elementView.element as HTMLFormElement;
        form.submit();
    }
}