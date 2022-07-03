import { AppApiAction } from "./AppApiAction";
import { AppApiContent } from "./AppApiContent";
import { AppApiEvents } from "./AppApiEvents";
import { AppApiView } from "./AppApiView";
import { AppResourceUrl } from "./AppResourceUrl";

export class AppApiGroup {
    constructor(
        private readonly events: AppApiEvents,
        resourceUrl: AppResourceUrl,
        readonly name: string
    ) {
        this.resourceUrl = resourceUrl.withGroup(name);
    }

    private readonly resourceUrl: AppResourceUrl;

    protected createView<TModel>(name: string) {
        return new AppApiView<TModel>(this.resourceUrl, name);
    }

    protected createAction<TModel, TResult>(name: string, friendlyName: string) {
        return new AppApiAction<TModel, TResult>(this.events, this.resourceUrl, name, friendlyName);
    }

    protected createContent<TModel, TResult>(name: string, friendlyName: string) {
        return new AppApiContent<TModel, TResult>(this.events, this.resourceUrl, name, friendlyName);
    }

    toString() {
        return `AppApiGroup ${this.resourceUrl}`;
    }
}