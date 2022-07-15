import { AppApiEvents } from "./AppApiEvents";
import { AppApiGroup } from "./AppApiGroup";
import { AppApiQuery } from "./AppApiQuery";
import { AppResourceUrl } from "./AppResourceUrl";
import { XtiUrl } from './XtiUrl';

export type apiConstructor<T extends AppApi> = {
    new(events: AppApiEvents): T;
};

export class AppApi {
    private readonly resourceUrl: AppResourceUrl;
    readonly groups: {
        [name: string]: AppApiGroup | AppApiQuery<any, any>
    } = {};
    readonly User: IUserGroup;

    constructor(
        private readonly events: AppApiEvents,
        app: string
    ) {
        this.resourceUrl = AppResourceUrl.app(
            app,
            XtiUrl.current().path.modifier,
            pageContext.CacheBust
        );
    }

    get name() { return this.resourceUrl.path.app; }

    get url() { return this.resourceUrl.relativeUrl; }

    protected addGroup<T extends AppApiGroup>(
        createGroup: (evts: AppApiEvents, resourceUrl: AppResourceUrl) => T
    ) {
        let group = createGroup(this.events, this.resourceUrl);
        this.groups[group.name] = group;
        return group;
    }

    protected addODataGroup<TArgs, TEntity>(
        createGroup: (evts: AppApiEvents, resourceUrl: AppResourceUrl) => AppApiQuery<TArgs, TEntity>
    ) {
        const group = createGroup(this.events, this.resourceUrl);
        this.groups[group.name] = group;
        return group;
    }

    toString() {
        return `AppApi ${this.resourceUrl}`;
    }
}