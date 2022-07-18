import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
import { BasicComponentView } from "../Views/BasicComponentView";
import { ILinkView } from "../Views/Types";
import { BasicComponent } from "./BasicComponent";

export class LinkComponent extends BasicComponent {
    static readonly doNothing = 'javascript:;';

    protected readonly view: BasicComponentView & ILinkView;
    private _data: any;
    private href: string;

    constructor(view: BasicComponentView & ILinkView) {
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