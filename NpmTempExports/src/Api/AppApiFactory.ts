import { ConsoleLog } from "../ConsoleLog";
import { ModalErrorComponent } from "../Error/ModalErrorComponent";
import { apiConstructor, AppApi } from "./AppApi";
import { AppApiEvents } from "./AppApiEvents";

export class AppApiFactory {
    constructor(private readonly modalError: ModalErrorComponent) {
    }

    api<TApi extends AppApi>(apiCtor: apiConstructor<TApi>): TApi {
        let events = new AppApiEvents((err) => {
            new ConsoleLog().error(err.toString());
            this.modalError.show(err.getErrors(), err.getCaption());
        });
        let api = new apiCtor(events);
        return api;
    }
}