import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { ButtonCommandView } from "./Command";
import { FormGroupContainerView } from "./FormGroupContainerView";
import { IFormAttributes, TargetValue, ViewConstructor } from "./Types";

export class FormView extends BasicContainerView {

    constructor(container: BasicComponentView) {
        super(container, 'form');
        this.setAction("#");
        this.setMethod('POST');
    }

    configureFormGroupContainers(configure: (fgc: FormGroupContainerView) => void) {
        for (const formGroupContainer of this.getViews()) {
            if (formGroupContainer instanceof FormGroupContainerView) {
                configure(formGroupContainer);
            }
        }
    }

    addFormGroupContainer<T extends FormGroupContainerView>(ctor?: ViewConstructor<T>) {
        if (!ctor) {
            ctor = FormGroupContainerView as any;
        }
        return this.addView(ctor);
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

    styleAsValidated() {
        this.addCssName('was-validated');
    }

    styleAsNotValidated() {
        this.removeCssName('was-validated');
    }
}