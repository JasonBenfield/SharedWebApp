import { BlockViewModel } from '../Html/BlockViewModel';
import { TextBlockView } from '../Html/TextBlockView';
import { CardHeaderView } from './CardHeaderView';
export declare class CardTitleHeaderView extends CardHeaderView implements ITextComponentView {
    readonly textBlock: TextBlockView;
    constructor(vm?: BlockViewModel);
    setText(text: string): void;
}
