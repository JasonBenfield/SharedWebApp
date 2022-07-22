import { AppApiAction } from './AppApiAction';
import { AppApiEvents } from './AppApiEvents';
import { AppApiGroup } from './AppApiGroup';
import { AppApiView } from './AppApiView';
import { AppResourceUrl } from './AppResourceUrl';

export class UserGroup extends AppApiGroup {
    private readonly getUserAccessAction: AppApiAction<IResourcePath[], IResourcePathAccess[]>;

    constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
        super(events, resourceUrl, 'User');
        this.Logout = this.createView<ILogoutRequest>('Logout');
        this.getUserAccessAction = this.createAction<IResourcePath[], IResourcePathAccess[]>(
            'GetUserAccess',
            'Get User Access'
        );
    }

    readonly Logout: AppApiView<ILogoutRequest>;

    GetUserAccess(paths: IResourcePath[], options: IActionErrorOptions) {
        return this.getUserAccessAction.execute(paths, options);
    }


}