import { AppApiEvents } from "./AppApiEvents";
import { AppApiGroup } from "./AppApiGroup";
import { AppResourceUrl } from "./AppResourceUrl";
export declare type apiConstructor<T extends AppApi> = {
    new (events: AppApiEvents): T;
};
export declare class AppApi {
    private readonly events;
    private readonly resourceUrl;
    readonly groups: {
        [name: string]: AppApiGroup;
    };
    readonly User: IUserGroup;
    constructor(events: AppApiEvents, app: string);
    get name(): string;
    get url(): import("../UrlBuilder").UrlBuilder;
    protected addGroup<T extends AppApiGroup>(createGroup: (evts: AppApiEvents, resourceUrl: AppResourceUrl) => T): T;
    toString(): string;
}
