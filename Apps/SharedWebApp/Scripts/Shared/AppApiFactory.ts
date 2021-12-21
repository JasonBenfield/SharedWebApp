import { apiConstructor, AppApi } from "./AppApi";
import { AppApiEvents } from "./AppApiEvents";
import { ConsoleLog } from "./ConsoleLog";
import { ModalErrorComponent } from "./Error/ModalErrorComponent";
import { HostEnvironment } from "./HostEnvironment";

export class AppApiFactory {
    constructor(
        private readonly _defaultApiType: apiConstructor<AppApi>,
        private readonly modalError: ModalErrorComponent) {
    }

    api<TApi extends AppApi>(apiCtor: apiConstructor<TApi>): TApi {
        let api: TApi;
        let events = new AppApiEvents((err) => {
            new ConsoleLog().error(err.toString());
            this.modalError.show(err.getErrors(), err.getCaption());
        });
        if (apiCtor === this._defaultApiType) {
            api = new apiCtor(events, `${location.protocol}//${location.host}`, 'Current');
        }
        else {
            let hostEnvironment = new HostEnvironment();
            api = new apiCtor(
                events,
                pageContext.BaseUrl,
                hostEnvironment.isProduction ? '' : 'Current'
            );
        }
        return api;
    }
}