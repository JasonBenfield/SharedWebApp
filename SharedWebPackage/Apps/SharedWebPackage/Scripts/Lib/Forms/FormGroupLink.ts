import { TextLinkComponent } from "../Components/TextLinkComponent";
import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
import { FormGroupLinkView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupLink extends FormGroup {
    private readonly linkComponent: TextLinkComponent;

    constructor(view: FormGroupLinkView) {
        super(view);
        this.linkComponent = this.addComponent(new TextLinkComponent(view.linkView));
        this.linkComponent.syncTitleWithText();
    }

    getValue() { return this.linkComponent.getText(); }

    setValue(value: string) {
        this.linkComponent.setText(value);
    }

    setHrefToDoNothing() {
        this.linkComponent.setHrefToDoNothing();
    }

    setHref(href: string | Url | UrlBuilder) {
        this.linkComponent.setHref(href);
    }

    setTargetToBlank() {
        this.linkComponent.setTargetToBlank();
    }

    setTargetToDefault() {
        this.linkComponent.setTargetToDefault();
    }

}