import { AppClientAction } from './AppClientAction';
import { AppClientEvents } from './AppClientEvents';
import { AppClientGroup } from './AppClientGroup';
import { AppClientView } from './AppClientView';
import { AppResourceUrl } from './AppResourceUrl';

export class UserGroup extends AppClientGroup {
    private readonly getUserAccessAction: AppClientAction<IResourcePath[], IResourcePathAccess[]>;
    private readonly getMenuLinksAction: AppClientAction<string, ILinkModel[]>;

    constructor(events: AppClientEvents, resourceUrl: AppResourceUrl) {
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

    readonly Logout: AppClientView<ILogoutRequest>;

    readonly UserProfile: AppClientView<ILogoutRequest>;

    GetUserAccess(paths: IResourcePath[], options?: IActionErrorOptions) {
        return this.getUserAccessAction.execute(paths, options || {});
    }

    GetMenuLinks(menuName: string, options?: IActionErrorOptions) {
        return this.getMenuLinksAction.execute(menuName, options || {});
    }
}