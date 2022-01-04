import { Heading3 } from './Heading3';
import { Heading3ViewModel } from './Heading3ViewModel';
import { TextSpanView } from './TextSpanView';
export declare class TextHeading3View extends Heading3 implements ITextComponentView {
    protected readonly vm: Heading3ViewModel;
    readonly textSpan: TextSpanView;
    constructor(vm?: Heading3ViewModel);
    setText(text: string): void;
    setTitle(title: string): void;
}
