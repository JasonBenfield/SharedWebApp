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

    setAction(action: (source: BasicComponentView) => void) {
        this.action = action;
        return this;
    }

    select(selector: string) {
        this.selector = selector;
        return this;
    }

    preventDefault() {
        this._preventDefault = true;
    }

    subscribe() {
        this.elementView.on(
            this.name,
            this.selector,
            this._preventDefault,
            () => this.action(this.view)
        );
    }
}