import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
import { LinkView } from "./LinkView";

export class Link {
    private href: string;

    private static readonly doNothing = 'javascript:;';

    constructor(private readonly view: LinkView) {
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