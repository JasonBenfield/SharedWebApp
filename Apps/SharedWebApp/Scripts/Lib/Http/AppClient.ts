import { AppClientAction } from "./AppClientAction";
import { AppClientContent } from "./AppClientContent";
import { AppClientEvents } from "./AppClientEvents";
import { AppClientGroup } from "./AppClientGroup";
import { AppClientQuery } from "./AppClientQuery";
import { AppClientView } from "./AppClientView";
import { AppResourceUrl } from "./AppResourceUrl";
import { UserCacheGroup } from "./UserCacheGroup";
import { UserGroup } from "./UserGroup";
import { XtiUrl } from './XtiUrl';

export type apiConstructor<T extends AppClient> = {
    new(events: AppClientEvents): T;
};

type AppClientMethod =
    AppClientAction<any, any> |
    AppClientView<any> |
    AppClientContent<any, any> |
    AppClientQuery<any, any>;

class UserAccessRequest<T extends AppClient> {
    constructor(
        readonly getAction: (api: T) => AppClientMethod,
        readonly modKey = XtiUrl.current().path.modifier
    ) {
    }
}

interface IGetUserAccessRequest<T extends AppClient> {
    [name: string]: UserAccessRequest<T>;
}

type GetUserAccessResult<T extends IGetUserAccessRequest<any>> = {
    [k in keyof T]: boolean;
}

interface IKeyPath {
    key: string;
    path: IResourcePath;
}

export class AppClient {
    private readonly resourceUrl: AppResourceUrl;
    readonly groups: {
        [name: string]: AppClientGroup | AppClientQuery<any, any>
    } = {};
    readonly User: UserGroup;
    readonly UserCache: UserCacheGroup;

    constructor(
        private readonly events: AppClientEvents,
        app: string
    ) {
        this.resourceUrl = AppResourceUrl.app(
            app,
            XtiUrl.current().path.modifier,
            pageContext.CacheBust
        );
        this.User = this.addGroup((evts, resourceUrl) => new UserGroup(evts, resourceUrl));
        this.UserCache = this.addGroup((evts, resourceUrl) => new UserCacheGroup(evts, resourceUrl));
    }

    get name() { return this.resourceUrl.path.app; }

    get url() { return this.resourceUrl.relativeUrl; }

    protected addGroup<T extends AppClientGroup>(
        createGroup: (evts: AppClientEvents, resourceUrl: AppResourceUrl) => T
    ) {
        const group = createGroup(this.events, this.resourceUrl);
        this.groups[group.name] = group;
        return group;
    }

    protected addODataGroup<TArgs, TEntity>(
        createGroup: (evts: AppClientEvents, resourceUrl: AppResourceUrl) => AppClientQuery<TArgs, TEntity>
    ) {
        const group = createGroup(this.events, this.resourceUrl);
        this.groups[group.name] = group;
        return group;
    }

    getAccessRequest(
        getAction: (api: this) => AppClientMethod,
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