import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { ICitableAttributes } from "./Types";

export class BlockQuoteView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'blockquote');
    }

    protected setAttr: (config: (attr: ICitableAttributes) => void) => void;

    setCite(cite: string) {
        this.setAttr(attr => attr.cite = cite);
    }
}