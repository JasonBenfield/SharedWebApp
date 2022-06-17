import { AppApiEvents } from "./AppApiEvents";
import { AppApiQuery } from "./AppApiQuery";
import { AppApiView } from "./AppApiView";
import { AppResourceUrl } from "./AppResourceUrl";

export class AppApiODataGroup<TEntity> {
    private readonly resourceUrl: AppResourceUrl;
    private readonly getAction: AppApiQuery<TEntity>;

    constructor(
        private readonly events: AppApiEvents,
        resourceUrl: AppResourceUrl,
        public readonly name: string
    ) {
        this.resourceUrl = resourceUrl.withGroup(name);
        this.ToExcel = new AppApiView<string>(this.resourceUrl, 'ToExcel');
        this.getAction = new AppApiQuery<TEntity>(this.events, this.resourceUrl);
    }

    readonly ToExcel: AppApiView<string>;

    url() { return this.getAction.url(); }

    Get(odataOptions: string, options?: IActionErrorOptions) {
        return this.getAction.execute(odataOptions, options || {});
    }

    toString() {
        return `AppApiODataGroup ${this.resourceUrl}`;
    }
}