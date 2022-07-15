import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
import { LinkView } from "../Views/LinkView";
import { LinkListGroupItemView } from "../Views/ListGroup";
import { BasicComponent } from "./BasicComponent";

export class LinkComponent extends BasicComponent {
    static readonly doNothing = 'javascript:;';

    protected readonly view: LinkView | LinkListGroupItemView;
    private _data: any;
    private href: string;

    constructor(view: LinkView | LinkListGroupItemView) {
        super(view);
        this.setHrefToDoNothing();
    }

    get data() { return this._data; }

    set data(data: any) { this._data = data; }

    setHrefToDoNothing() {
        this.setHref(LinkComponent.doNothing);
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