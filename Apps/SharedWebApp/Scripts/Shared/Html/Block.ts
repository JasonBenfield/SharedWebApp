import { FlexCss } from '../FlexCss';
import { BlockViewModel } from './BlockViewModel';
import { HtmlContainerComponent } from './HtmlContainerComponent';

export class Block extends HtmlContainerComponent {
    protected readonly vm: BlockViewModel;

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
    }

    height100() {
        this.addCssName('h-100');
    }

    flexFill() {
        this.addCssFrom(new FlexCss().fill());
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
        this.vm.role(role);
    }
}