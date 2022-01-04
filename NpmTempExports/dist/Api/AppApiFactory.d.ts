import { ModalErrorComponent } from "../Error/ModalErrorComponent";
import { apiConstructor, AppApi } from "./AppApi";
export declare class AppApiFactory {
    private readonly modalError;
    constructor(modalError: ModalErrorComponent);
    api<TApi extends AppApi>(apiCtor: apiConstructor<TApi>): TApi;
}
