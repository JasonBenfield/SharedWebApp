import { CssClass } from "../CssClass";

export class ContainerCss extends CssClass {
    static remove() { return new ContainerCss().remove(); }

    protected buildCss() {
        return "container";
    }
}