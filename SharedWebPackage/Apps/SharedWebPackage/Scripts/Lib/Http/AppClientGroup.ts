import { AppClientAction } from "./AppClientAction";
import { AppClientContent } from "./AppClientContent";
import { AppClientEvents } from "./AppClientEvents";
import { AppClientView } from "./AppClientView";
import { AppResourceUrl } from "./AppResourceUrl";

export class AppClientGroup {
    private readonly resourceUrl: AppResourceUrl;
    private readonly actions: (AppClientAction<any, any> | AppClientView<any> | AppClientContent<any, any>)[] = [];

    constructor(
        private readonly events: AppClientEvents,
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
        const view = new AppClientView<TModel>(this.resourceUrl, name);
        this.actions.push(view);
        return view;
    }

    protected createAction<TModel, TResult>(name: string, friendlyName: string) {
        const action = new AppClientAction<TModel, TResult>(this.events, this.resourceUrl, name, friendlyName);
        this.actions.push(action);
        return action;
    }

    protected createContent<TModel, TResult>(name: string, friendlyName: string) {
        const content = new AppClientContent<TModel, TResult>(this.events, this.resourceUrl, name, friendlyName);
        this.actions.push(content);
        return content;
    }

    toString() {
        return `AppApiGroup ${this.resourceUrl}`;
    }
}