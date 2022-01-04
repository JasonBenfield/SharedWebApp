import { Heading6 } from './Heading6';
import { Heading6ViewModel } from './Heading6ViewModel';
import { TextSpanView } from './TextSpanView';
export declare class TextHeading6View extends Heading6 implements ITextComponentView {
    protected readonly vm: Heading6ViewModel;
    readonly textSpan: TextSpanView;
    constructor(vm?: Heading6ViewModel);
    setText(text: string): void;
    setTitle(title: string): void;
}
