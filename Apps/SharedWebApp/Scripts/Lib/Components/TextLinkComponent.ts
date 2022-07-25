import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
import { BasicComponentView } from "../Views/BasicComponentView";
import { ILinkView, ITextComponentView } from "../Views/Types";
import { TextComponent } from "./TextComponent";

export class TextLinkComponent extends TextComponent {
    static readonly doNothing = 'javascript:;';

    protected readonly view: BasicComponentView & ITextComponentView & ILinkView;
    private href: string;

    constructor(view: BasicComponentView & ITextComponentView & ILinkView) {
        super(view);
        this.setHrefToDoNothing();
    }

    setHrefToDoNothing() {
        this.setHref(TextLinkComponent.doNothing);
    }

    setHref(href: string | Url | UrlBuilder) {
        if (href instanceof Url) {
            this.href = href.value();
        }
        else if (href instanceof UrlBuilder) {
            this.href = href.value();
        }
        else {
            this.href = href;
        }
        this.view.setHref(this.href);
    }
}