import { Block } from './Block';
import { BlockViewModel } from './BlockViewModel';

export class Container extends Block {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.setContainerCss('container');
    }

    fluid() {
        this.setContainerCss('container-fluid');
    }

    private containerCss = '';

    private setContainerCss(containerCss: string) {
        this.removeCssName(this.containerCss);
        this.addCssName(containerCss);
        this.containerCss = containerCss;
    }
}