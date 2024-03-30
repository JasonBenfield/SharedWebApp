import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
import { LinkComponentView } from "../Views/Types";
import { BasicComponent } from "./BasicComponent";

export class LinkComponent extends BasicComponent {
    static readonly doNothing = 'javascript:;';

    protected readonly view: LinkComponentView;
    private _data: any;
    private href: string;

    constructor(view: LinkComponentView) {
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

    setTargetToBlank() {
        this.view.setTarget('_blank');
    }

    setTargetToDefault() {
        this.view.setTarget(null);
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}