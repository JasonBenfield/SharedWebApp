import { FlexCss } from '../FlexCss';
import { BlockViewModel } from './BlockViewModel';
import { HtmlContainerComponent } from './HtmlContainerComponent';
import { ViewEvents } from './ViewEvents';

export class Block extends HtmlContainerComponent {
    protected readonly vm: BlockViewModel;

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
    }

    readonly events = new ViewEvents(this, (options) => this.vm.xtiEvent(options));

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
        this.setAttr(attr => attr.role = role);
    }
}