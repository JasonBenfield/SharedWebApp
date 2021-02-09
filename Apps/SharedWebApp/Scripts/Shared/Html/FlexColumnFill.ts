import { ContextualClass } from "../ContextualClass";
import { Block } from "./Block";
import { BlockViewModel } from "./BlockViewModel";
import { Container } from "./Container";
import { HtmlComponent } from "./HtmlComponent";

export class FlexColumnFill extends HtmlComponent {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        let block = new Block(vm);
        block.flexFill();
        this.setBackgroundContext(ContextualClass.light);
        block.positionRelative();
        let absFillBlock = block.addContent(new Block());
        absFillBlock.positionAbsoluteFill();
        absFillBlock.scrollable();
        this.container = absFillBlock.addContent(new Container());
    }

    readonly container: Container;

    addContent<TItem extends IComponent>(item: TItem) {
        item.addToContainer(this.container);
        return item;
    }
}