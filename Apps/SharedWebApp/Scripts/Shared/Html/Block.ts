import { BlockViewModel } from './BlockViewModel';
import { HtmlContainerComponent } from './HtmlContainerComponent';

export class Block extends HtmlContainerComponent {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
    }

    protected readonly vm: BlockViewModel;

    height100() {
        this.addCssName('h-100');
    }

    flexFill() {
        this.addCssName('flex-fill');
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
}