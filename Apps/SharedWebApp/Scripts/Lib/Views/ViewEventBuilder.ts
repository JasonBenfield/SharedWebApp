import { HtmlElementView } from "./HtmlElementView";

export class ViewEventBuilder {
    private action: (sourceElement: HTMLElement, evt: JQueryEventObject) => void;
    private selector: string;
    private _preventDefault: boolean;

    constructor(
        private readonly elementView: HtmlElementView,
        private readonly name: string
    ) {
    }

    execute(action: (sourceElement: HTMLElement, evt: JQueryEventObject) => void) {
        this.action = action;
        return new ViewEventActionBuilder(this);
    }

    select(selector: string) {
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
            (el: HTMLElement, evt: JQueryEventObject) => {
                if (this._preventDefault) {
                    evt.preventDefault();
                }
                return this.action(el, evt);
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