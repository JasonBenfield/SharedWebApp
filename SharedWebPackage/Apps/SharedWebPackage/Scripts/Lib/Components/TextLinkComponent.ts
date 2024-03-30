import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
import { BasicComponentView } from "../Views/BasicComponentView";
import { ILinkView, ITextComponentView, TextLinkComponentView } from "../Views/Types";
import { TextComponent } from "./TextComponent";

export class TextLinkComponent extends TextComponent {
    static readonly doNothing = 'javascript:;';

    protected readonly view: TextLinkComponentView;
    private href: string;

    constructor(view: TextLinkComponentView) {
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

    setTargetToBlank() {
        this.view.setTarget('_blank');
    }

    setTargetToDefault() {
        this.view.setTarget(null);
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}