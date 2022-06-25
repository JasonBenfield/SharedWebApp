import { BasicComponentView } from "./BasicComponentView";
import { HtmlElementView } from "./HtmlElementView";

export class ViewEventBuilder {
    private action: (source: BasicComponentView) => void;
    private selector: string;
    private _preventDefault: boolean;

    constructor(
        private readonly view: BasicComponentView,
        private readonly elementView: HtmlElementView,
        private readonly name: string
    ) {
    }

    execute(action: (source: BasicComponentView) => void) {
        this.action = action;
        return new ViewEventActionBuilder(this);
    }

    select(selector: string) {
        this.selector = selector;
        return this;
    }

    allowDefault() {
        this._preventDefault = false;
        return this;
    }

    preventDefault() {
        this._preventDefault = true;
        return this;
    }

    subscribe() {
        this.elementView.on(
            this.name,
            this.selector,
            this._preventDefault,
            (el: HTMLElement) => {
                const view = this.view.getViewByElement(el) || this.view;
                this.action(view);
            }
        );
    }
}

export class ViewEventActionBuilder {
    constructor(private readonly builder: ViewEventBuilder) {
    }

    select(selector: string) {
        this.builder.select(selector);
        return this;
    }

    allowDefault() {
        this.builder.allowDefault();
        return this;
    }

    preventDefault() {
        this.builder.preventDefault();
        return this;
    }

    subscribe() {
        this.builder.subscribe();
    }
}