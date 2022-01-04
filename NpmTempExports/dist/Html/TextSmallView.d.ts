import { Small } from './Small';
import { SmallViewModel } from './SmallViewModel';
import { TextSpanView } from './TextSpanView';
export declare class TextSmallView extends Small implements ITextComponentView {
    readonly textSpan: TextSpanView;
    constructor(vm?: SmallViewModel);
    setText(text: string): void;
    setTitle(title: string): void;
}
