import { ButtonCommandItem } from "../Command/ButtonCommandItem";
import { AggregateComponent } from "./AggregateComponent";
import { FormComponentViewModel } from "./FormComponentViewModel";
import { HtmlContainerComponent } from "./HtmlContainerComponent";

export class FormComponent extends HtmlContainerComponent {
    constructor(vm: FormComponentViewModel = new FormComponentViewModel()) {
        super(vm);
        this.setAction("#");
    }

    readonly vm: FormComponentViewModel;

    readonly submitted = this.vm.submitted;

    useDefaultSubmit() {
        this.vm.useDefaultSubmit();
    }

    readonly content = new AggregateComponent(this.vm.content);

    clearAutocomplete() { this.setAutocomplete(null); }

    setAutocompleteOff() { this.setAutocomplete('off'); }

    setAutocompleteNewPassword() { this.setAutocomplete('new-password'); }

    private setAutocomplete(autocomplete: string) {
        this.vm.autocomplete(autocomplete);
    }

    setAction(action: string) { this.vm.action(action); }

    setMethod(method: string) { this.vm.method(method); }

    addOffscreenSubmit() {
        return this.addContent(new ButtonCommandItem())
            .configure(button => {
                button.makeOffscreenSubmit();
            });
    }
}