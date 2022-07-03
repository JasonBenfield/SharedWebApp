import { ModalError } from "../Components/ModalError";
import { ConsoleLog } from "../ConsoleLog";
import { ModalErrorView } from "../Views/ModalError";
import { apiConstructor, AppApi } from "./AppApi";
import { AppApiEvents } from "./AppApiEvents";

export class AppApiFactory {
    private readonly modalError: ModalError;

    constructor(modalError: ModalErrorView) {
        this.modalError = new ModalError(modalError);
    }

    api<TApi extends AppApi>(apiCtor: apiConstructor<TApi>): TApi {
        const events = new AppApiEvents((err) => {
            new ConsoleLog().error(err.toString());
            this.modalError.show(err.getErrors(), err.getCaption());
        });
        const api = new apiCtor(events);
        return api;
    }
}