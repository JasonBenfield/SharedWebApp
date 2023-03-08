﻿import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { ICitableAttributes } from "./Types";

export class TextDelView extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'del');
    }

    protected setAttr: (config: (attr: ICitableAttributes) => void) => void;

    setCite(cite: string) {
        this.setAttr(attr => attr.cite = cite);
    }
}