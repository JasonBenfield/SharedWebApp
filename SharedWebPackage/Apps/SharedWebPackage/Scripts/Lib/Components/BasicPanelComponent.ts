import { Awaitable } from "../Awaitable";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicComponent } from "./BasicComponent";

export class BasicPanelComponent<TResult> extends BasicComponent implements IPanel {
    private readonly awaitable = new Awaitable<TResult>();

    constructor(view: BasicComponentView) {
        super(view);
    }

    protected resolve(result: TResult) { this.awaitable.resolve(result); }

    start() { return this.awaitable.start(); }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}