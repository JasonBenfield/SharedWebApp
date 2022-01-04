import { AppApiEvents } from "./AppApiEvents";
import { AppResourceUrl } from "./AppResourceUrl";
export declare class AppApiAction<TArgs, TResult> {
    private readonly events;
    readonly friendlyName: string;
    private readonly resourceUrl;
    private static dateRegex;
    constructor(events: AppApiEvents, resourceUrl: AppResourceUrl, actionName: string, friendlyName: string);
    execute(data: TArgs, errorOptions: IActionErrorOptions): Promise<TResult>;
    private parseDates;
    toString(): string;
}
