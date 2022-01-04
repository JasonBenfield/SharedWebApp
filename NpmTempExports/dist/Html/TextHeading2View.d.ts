import { Heading2 } from './Heading2';
import { Heading2ViewModel } from './Heading2ViewModel';
import { TextSpanView } from './TextSpanView';
export declare class TextHeading2View extends Heading2 implements ITextComponentView {
    protected readonly vm: Heading2ViewModel;
    readonly textSpan: TextSpanView;
    constructor(vm?: Heading2ViewModel);
    setText(text: string): void;
    setTitle(title: string): void;
}
