import { AppApiAction } from "./AppApiAction";
import { AppApiEvents } from "./AppApiEvents";
import { AppApiGroup } from "./AppApiGroup";
import { AppApiQuery } from "./AppApiQuery";
import { AppResourceUrl } from "./AppResourceUrl";
import { UserGroup } from "./UserGroup";
import { XtiUrl } from './XtiUrl';

export type apiConstructor<T extends AppApi> = {
    new(events: AppApiEvents): T;
};

class UserAccessRequest<T extends AppApi> {
    constructor(
        readonly getAction: (api: T) => AppApiAction<any, any>,
        readonly modKey = XtiUrl.current().path.modifier
    ) {
    }
}

interface IGetUserAccessRequest<T extends AppApi> {
    [name: string]: UserAccessRequest<T>;
}

type GetUserAccessResult<T extends IGetUserAccessRequest<any>> = {
    [k in keyof T]: boolean;
}

interface IKeyPath {
    key: string;
    path: IResourcePath;
}

export class AppApi {
    private readonly resourceUrl: AppResourceUrl;
    readonly groups: {
        [name: string]: AppApiGroup | AppApiQuery<any, any>
    } = {};
    readonly User: UserGroup;

    constructor(
        private readonly events: AppApiEvents,
        app: string
    ) {
        this.resourceUrl = AppResourceUrl.app(
            app,
            XtiUrl.current().path.modifier,
            pageContext.CacheBust
        );
        this.User = this.addGroup((evts, resourceUrl) => new UserGroup(evts, resourceUrl));
    }

    get name() { return this.resourceUrl.path.app; }

    get url() { return this.resourceUrl.relativeUrl; }

    protected addGroup<T extends AppApiGroup>(
        createGroup: (evts: AppApiEvents, resourceUrl: AppResourceUrl) => T
    ) {
        const group = createGroup(this.events, this.resourceUrl);
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

    getAccessRequest(
        getAction: (api: this) => AppApiAction<any, any>,
        modKey?: string
    ) {
        return new UserAccessRequest(getAction, modKey);
    }

    async getUserAccess<T extends IGetUserAccessRequest<this>>(resources: T) {
        const result: any = {};
        const paths: IResourcePath[] = [];
        const keyPaths: IKeyPath[] = [];
        for (const key in resources) {
            const request = resources[key];
            const action = request.getAction(this);
            const path: IResourcePath = {
                Group: action.path.group,
                Action: action.path.action,
                ModKey: request.modKey
            }
            paths.push(path);
            keyPaths.push({ key: key, path: path });
        }
        const resourceAuthorizations = await this.User.GetUserAccess(paths, {});
        for (const resourceAuthorization of resourceAuthorizations) {
            const keyPath = keyPaths.find(
                kp =>
                    kp.path.Group === resourceAuthorization.Path.Group &&
                    kp.path.Action === resourceAuthorization.Path.Action &&
                    kp.path.ModKey === resourceAuthorization.Path.ModKey
            );
            result[keyPath.key] = resourceAuthorization.HasAccess;
        }
        return result as GetUserAccessResult<T>;
    }

    toString() {
        return `AppApi ${this.resourceUrl}`;
    }
}