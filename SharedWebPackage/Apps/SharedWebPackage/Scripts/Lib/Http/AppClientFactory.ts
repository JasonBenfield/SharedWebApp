import { ModalError } from "../Components/ModalError";
import { ConsoleLog } from "../ConsoleLog";
import { ModalErrorView } from "../Views/ModalError";
import { appClientCtor, AppClient } from "./AppClient";
import { AppClientEvents } from "./AppClientEvents";

export class AppClientFactory {
    private readonly modalError: ModalError;

    constructor(modalError: ModalErrorView) {
        this.modalError = new ModalError(modalError);
    }

    create<TApi extends AppClient>(apiCtor: appClientCtor<TApi>): TApi {
        const events = new AppClientEvents((err) => {
            new ConsoleLog().error(err.toString());
            this.modalError.show(err.getErrors(), err.getCaption());
            if (pageContext.IsAuthenticated && err.isAuthenticationError()) {
                let lastRefreshed: Date;
                const lastRefreshedText = localStorage.getItem('xti_last_refresh_not_authenticated');
                if (lastRefreshedText) {
                    try {
                        lastRefreshed = new Date(Date.parse(lastRefreshedText));
                    }
                    catch {
                        lastRefreshed = new Date(2000, 0, 1);
                    }
                }
                else {
                    lastRefreshed = new Date(2000, 0, 1);
                }
                const maxTime = new Date();
                maxTime.setMinutes(maxTime.getMinutes() - 5);
                if (lastRefreshed < maxTime) {
                    localStorage.setItem('xti_last_refresh_not_authenticated', new Date().toString());
                    location.reload();
                }
            }
        });
        const api = new apiCtor(events);
        return api;
    }
}