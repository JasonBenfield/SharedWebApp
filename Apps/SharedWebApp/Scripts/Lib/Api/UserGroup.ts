import { AppApiAction } from './AppApiAction';
import { AppApiEvents } from './AppApiEvents';
import { AppApiGroup } from './AppApiGroup';
import { AppApiView } from './AppApiView';
import { AppResourceUrl } from './AppResourceUrl';

export class UserGroup extends AppApiGroup {
    private readonly getUserAccessAction: AppApiAction<IResourcePath[], IResourcePathAccess[]>;
    private readonly getMenuLinksAction: AppApiAction<string, ILinkModel[]>;

    constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
        super(events, resourceUrl, 'User');
        this.Logout = this.createView<ILogoutRequest>('Logout');
        this.UserProfile = this.createView<ILogoutRequest>('UserProfile');
        this.getUserAccessAction = this.createAction<IResourcePath[], IResourcePathAccess[]>(
            'GetUserAccess',
            'Get User Access'
        );
        this.getMenuLinksAction = this.createAction<string, ILinkModel[]>(
            'GetMenuLinks',
            'Get Menu Links'
        );
    }

    readonly Logout: AppApiView<ILogoutRequest>;

    readonly UserProfile: AppApiView<ILogoutRequest>;

    GetUserAccess(paths: IResourcePath[], options?: IActionErrorOptions) {
        return this.getUserAccessAction.execute(paths, options || {});
    }

    GetMenuLinks(menuName: string, options?: IActionErrorOptions) {
        return this.getMenuLinksAction.execute(menuName, options || {});
    }
}