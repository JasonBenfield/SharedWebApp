import { Block } from '../Html/Block';
import { TextHeading4View } from '../Html/TextHeading4View';
import { ListGroupView } from '../ListGroup/ListGroupView';
export declare class ModalErrorGroupComponentView extends Block {
    private readonly hr;
    readonly caption: TextHeading4View;
    readonly errors: ListGroupView;
    constructor();
    showHR(): void;
    hideHR(): void;
}
