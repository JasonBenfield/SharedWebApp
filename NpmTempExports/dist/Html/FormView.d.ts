import { ButtonCommandItem } from "../Command/ButtonCommandItem";
import { AggregateComponent } from "./AggregateComponent";
import { FormViewModel } from "./FormViewModel";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
export declare class FormView extends HtmlContainerComponent {
    readonly vm: FormViewModel;
    readonly submitted: import("../Events").DefaultEventHandler<any>;
    readonly content: AggregateComponent;
    constructor(vm?: FormViewModel);
    useDefaultSubmit(): void;
    clearAutocomplete(): void;
    setAutocompleteOff(): void;
    setAutocompleteNewPassword(): void;
    private setAutocomplete;
    setAction(action: string): void;
    setMethod(method: string): void;
    addOffscreenSubmit(): ButtonCommandItem;
}
