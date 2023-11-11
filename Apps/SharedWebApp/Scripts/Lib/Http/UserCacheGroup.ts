import { AppClientGroup } from "./AppClientGroup";
import { AppClientAction } from "./AppClientAction";
import { AppClientEvents } from "./AppClientEvents";
import { AppResourceUrl } from "./AppResourceUrl";

export class UserCacheGroup extends AppClientGroup {
	constructor(events: AppClientEvents, resourceUrl: AppResourceUrl) {
		super(events, resourceUrl, 'UserCache');
		this.ClearCacheAction = this.createAction<string,IEmptyActionResult>('ClearCache', 'Clear Cache');
	}
	
	readonly ClearCacheAction: AppClientAction<string,IEmptyActionResult>;
	
	ClearCache(model: string, errorOptions?: IActionErrorOptions) {
		return this.ClearCacheAction.execute(model, errorOptions || {});
	}
}