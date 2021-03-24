import { apiConstructor, AppApi } from "./AppApi";
import { AppApiEvents } from "./AppApiEvents";
import { ConsoleLog } from "./ConsoleLog";
import { ModalErrorComponent } from "./Error/ModalErrorComponent";
import { HostEnvironment } from "./HostEnvironment";

export class AppApiFactory {

    private _defaultApiType: apiConstructor<AppApi>;

    set defaultApiType(defaultApi: apiConstructor<AppApi>) {
        this._defaultApiType = defaultApi;
    }

    defaultApi(modalError: ModalErrorComponent) {
        return this.api<AppApi>(this._defaultApiType, modalError);
    }

    api<TApi extends AppApi>(apiCtor: apiConstructor<TApi>, modalError: ModalErrorComponent): TApi {
        let api: TApi;
        let events = new AppApiEvents((err) => {
            new ConsoleLog().error(err.toString());
            modalError.show(err.getErrors(), err.getCaption());
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