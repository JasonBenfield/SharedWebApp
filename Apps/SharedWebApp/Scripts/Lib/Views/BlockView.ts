import { FlexCss } from "../FlexCss";
import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";

export class BlockView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'div');
    }

    height100() {
        this.addCssName('h-100');
    }

    setFlexCss(flexCss: FlexCss) {
        this.setCss('flex', flexCss);
    }

    positionRelative() {
        this.addCssName('position-relative');
    }

    positionAbsoluteFill() {
        this.addCssName('position-absolute-fill');
    }

    scrollable() {
        this.addCssName('overflow-auto');
    }

    setRole(role: string) {
        this.setAttr(attr => attr.role = role);
    }
}