import { PageFrameView } from "./PageFrameView";

export abstract class BaseStartup {
    build() {
        let pageFrame = new PageFrameView();
        pageFrame.load();
        return pageFrame;
    }
}