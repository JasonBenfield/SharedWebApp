import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { ICitableAttributes } from "./Types";

export class TextInsView extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'ins');
    }

    protected setAttr: (config: (attr: ICitableAttributes) => void) => void;

    setCite(cite: string) {
        this.setAttr(attr => attr.cite = cite);
    }
}