import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
import { TextLinkView } from "../Views/TextLinkView";
import { TextComponent } from "./TextComponent";

export class TextLinkComponent extends TextComponent {
    static readonly doNothing = 'javascript:;';

    protected readonly view: TextLinkView;
    private _data: any;
    private href: string;

    constructor(view: TextLinkView) {
        super(view);
        this.setHrefToDoNothing();
    }

    get data() { return this._data; }

    set data(data: any) { this._data = data; }

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