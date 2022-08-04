import { AppApiAction } from "./AppApiAction";
import { AppApiContent } from "./AppApiContent";
import { AppApiEvents } from "./AppApiEvents";
import { AppApiView } from "./AppApiView";
import { AppResourceUrl } from "./AppResourceUrl";

export class AppApiGroup {
    private readonly resourceUrl: AppResourceUrl;
    private readonly actions: (AppApiAction<any, any> | AppApiView<any> | AppApiContent<any, any>)[] = [];

    constructor(
        private readonly events: AppApiEvents,
        resourceUrl: AppResourceUrl,
        readonly name: string
    ) {
        this.resourceUrl = resourceUrl.withGroup(name);
    }

    withModifier(modifier: string) {
        for (const action of this.actions) {
            action.withModifier(modifier);
        }
    }

    protected createView<TModel>(name: string) {
        const view = new AppApiView<TModel>(this.resourceUrl, name);
        this.actions.push(view);
        return view;
    }

    protected createAction<TModel, TResult>(name: string, friendlyName: string) {
        const action = new AppApiAction<TModel, TResult>(this.events, this.resourceUrl, name, friendlyName);
        this.actions.push(action);
        return action;
    }

    protected createContent<TModel, TResult>(name: string, friendlyName: string) {
        const content = new AppApiContent<TModel, TResult>(this.events, this.resourceUrl, name, friendlyName);
        this.actions.push(content);
        return content;
    }

    toString() {
        return `AppApiGroup ${this.resourceUrl}`;
    }
}