import { BasicComponentView } from "./BasicComponentView";
import { IImgAttributes } from "./Types";

export class ImgView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'img');
    }

    protected setAttr: (config: (attr: IImgAttributes) => void) => void;

    setSrc(src: string) {
        this.setAttr(attr => attr.src = src);
    }

    setAlt(alt: string) {
        this.setAttr(attr => attr.alt = alt);
    }

    setImageWidth(width: number) {
        this.setAttr(attr => attr.width = width.toString());
    }

    setImageHeight(height: number) {
        this.setAttr(attr => attr.height = height.toString());
    }
}