import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { ICitableAttributes } from "./Types";

export class DelView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'del');
    }

    protected setAttr: (config: (attr: ICitableAttributes) => void) => void;

    setCite(cite: string) {
        this.setAttr(attr => attr.cite = cite);
    }
}