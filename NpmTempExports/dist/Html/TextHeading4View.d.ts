import { Heading4 } from './Heading4';
import { Heading4ViewModel } from './Heading4ViewModel';
import { TextSpanView } from './TextSpanView';
export declare class TextHeading4View extends Heading4 implements ITextComponentView {
    protected readonly vm: Heading4ViewModel;
    readonly textSpan: TextSpanView;
    constructor(vm?: Heading4ViewModel);
    setText(text: string): void;
    setTitle(title: string): void;
}
