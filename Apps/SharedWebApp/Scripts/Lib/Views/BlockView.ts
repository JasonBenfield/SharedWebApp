import { BorderCss } from "../BorderCss";
import { FlexCss } from "../FlexCss";
import { Position } from "../Position";
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

    setBorderCss(borderCss: BorderCss) {
        this.setCss('border', borderCss);
    }

    positionAbsoluteFill() {
        this.positionAbsolute(Position.fill());
    }

    scrollable() {
        this.addCssName('overflow-auto');
    }

    setRole(role: string) {
        this.setAttr(attr => attr.role = role);
    }
}