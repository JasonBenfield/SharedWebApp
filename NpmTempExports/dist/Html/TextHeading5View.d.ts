import { Heading5 } from './Heading5';
import { Heading5ViewModel } from './Heading5ViewModel';
import { TextSpanView } from './TextSpanView';
export declare class TextHeading5View extends Heading5 implements ITextComponentView {
    protected readonly vm: Heading5ViewModel;
    readonly textSpan: TextSpanView;
    constructor(vm?: Heading5ViewModel);
    setText(text: string): void;
    setTitle(title: string): void;
}
