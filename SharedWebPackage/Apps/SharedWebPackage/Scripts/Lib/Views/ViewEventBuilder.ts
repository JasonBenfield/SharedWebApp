import { HtmlElementView } from "./HtmlElementView";

export class ViewEventBuilder {
    private action: ((sourceElement: HTMLElement, evt: JQuery.Event) => void) | null = null;
    private selector: string | null = null;
    private _preventDefault = false;

    constructor(
        private readonly elementView: HtmlElementView,
        private readonly name: string
    ) {
    }

    execute(action: (sourceElement: HTMLElement, evt: JQuery.Event) => void) {
        this.action = action;
        return new ViewEventActionBuilder(this);
    }

    select(selector: string | null) {
        this.selector = selector;
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
            (el: HTMLElement, evt: JQuery.Event) => {
                if (this._preventDefault) {
                    evt.preventDefault();
                }
                if (this.action) {
                    return this.action(el, evt);
                }
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

    subscribe() {
        this.builder.subscribe();
    }
}