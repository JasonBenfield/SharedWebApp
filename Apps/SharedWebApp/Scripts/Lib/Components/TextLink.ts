import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
import { TextLinkView } from "../Views/TextLinkView";
import { Link } from "./Link";
import { TextComponent } from "./TextComponent";

export class TextLink extends TextComponent {
    protected readonly view: TextLinkView;
    private href: string;

    constructor(view: TextLinkView) {
        super(view);
        this.setHrefToDoNothing();
    }

    setHrefToDoNothing() {
        this.setHref(Link.doNothing);
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