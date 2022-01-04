import { TextBlockView } from "../Html/TextBlockView";
import { LinkListGroupItemView } from "../ListGroup/LinkListGroupItemView";
export declare class ModalErrorListItemView extends LinkListGroupItemView {
    private readonly captionCol;
    readonly caption: TextBlockView;
    readonly message: TextBlockView;
    constructor();
    hideCaption(): void;
    showCaption(): void;
}
