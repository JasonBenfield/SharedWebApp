import { ButtonCommandItem } from "../Command/ButtonCommandItem";
import { DelayedAction } from "../DelayedAction";
import { SimpleEvent } from "../Events";
import { AggregateComponent } from "./AggregateComponent";
import { FormViewModel } from "./FormViewModel";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { ViewEvents } from "./ViewEvents";

export class FormView extends HtmlContainerComponent {
    readonly vm: FormViewModel;

    readonly events = new ViewEvents(this, (options) => this.vm.xtiEvent(options));

    private readonly _submitted = new SimpleEvent(this);
    readonly submitted = this._submitted.handler;

    readonly content = new AggregateComponent(this.vm.content);

    constructor(vm: FormViewModel = new FormViewModel()) {
        super(vm);
        this.setAction("#");
        this.events.onSubmit(async () => {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            await DelayedAction.delay(300);
            this._submitted.invoke();
        });
    }

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
        return this.addContent(new ButtonCommandItem())
            .configure(button => {
                button.makeOffscreenSubmit();
            });
    }
}