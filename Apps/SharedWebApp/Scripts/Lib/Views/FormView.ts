import { BasicContainerView } from "./BasicContainerView";
import { HtmlElementView } from "./HtmlElementView";
import { IContainerView, IFormAttributes } from "./Types";

export class FormView extends BasicContainerView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'form'));
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
        return this.addView(new ButtonCommandItem())
            .configure(button => {
                button.makeOffscreenSubmit();
            });
    }
}