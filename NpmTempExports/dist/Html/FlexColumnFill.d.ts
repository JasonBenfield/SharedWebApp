import { BlockViewModel } from "./BlockViewModel";
import { Container } from "./Container";
import { HtmlComponent } from "./HtmlComponent";
export declare class FlexColumnFill extends HtmlComponent {
    readonly container: Container;
    constructor(vm?: BlockViewModel);
    addContent<TItem extends IComponent>(item: TItem): TItem;
}
