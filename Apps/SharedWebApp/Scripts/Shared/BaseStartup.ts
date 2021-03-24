import { apiConstructor, AppApi } from "./AppApi";
import { PageFrame } from "./PageFrame";

export let defaultApi: apiConstructor<AppApi>;

export abstract class BaseStartup {
    build() {
        let pageFrame = new PageFrame();
        pageFrame.setDefaultApiType(this.getDefaultApi());
        pageFrame.load();
        return pageFrame;
    }

    protected abstract getDefaultApi();
}