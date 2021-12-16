import { ButtonCommandItem } from "../Command/ButtonCommandItem";
import { AggregateComponent } from "./AggregateComponent";
import { FormViewModel } from "./FormViewModel";
import { HtmlContainerComponent } from "./HtmlContainerComponent";

export class FormView extends HtmlContainerComponent {
    readonly vm: FormViewModel;

    readonly submitted = this.vm.submitted;

    readonly content = new AggregateComponent(this.vm.content);

    constructor(vm: FormViewModel = new FormViewModel()) {
        super(vm);
        this.setAction("#");
    }

    useDefaultSubmit() {
        this.vm.useDefaultSubmit();
    }

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