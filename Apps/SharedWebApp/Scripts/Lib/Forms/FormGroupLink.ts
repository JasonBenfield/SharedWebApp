import { LinkComponent } from "../Components/LinkComponent";
import { TextComponent } from "../Components/TextComponent";
import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
import { FormGroupLinkView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupLink extends FormGroup {
    private readonly linkComponent: LinkComponent;
    private readonly textValueComponent: TextComponent;

    constructor(view: FormGroupLinkView) {
        super(view);
        this.linkComponent = this.addComponent(new LinkComponent(view.linkView));
        this.textValueComponent = new TextComponent(view.valueTextView);
        this.textValueComponent.syncTitleWithText();
    }

    getValue() { return this.textValueComponent.getText(); }

    setValue(value: string) {
        this.textValueComponent.setText(value);
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