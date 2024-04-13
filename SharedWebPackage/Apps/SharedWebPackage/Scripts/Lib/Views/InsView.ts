import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { ICitableAttributes } from "./Types";

export class InsView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'ins');
    }

    protected setAttr: (config: (attr: ICitableAttributes) => void) => void;

    setCite(cite: string) {
        this.setAttr(attr => attr.cite = cite);
    }
}