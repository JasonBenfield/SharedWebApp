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
        });
        const api = new apiCtor(events);
        return api;
    }
}