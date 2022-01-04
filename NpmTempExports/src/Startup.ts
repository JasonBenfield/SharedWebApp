import { PageFrameView } from "./PageFrameView";

export class Startup {
    build() {
        let pageFrame = new PageFrameView();
        pageFrame.load();
        return pageFrame;
    }
}