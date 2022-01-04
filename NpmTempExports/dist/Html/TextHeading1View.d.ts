import { Heading1 } from './Heading1';
import { Heading1ViewModel } from './Heading1ViewModel';
import { TextSpanView } from './TextSpanView';
export declare class TextHeading1View extends Heading1 implements ITextComponentView {
    protected readonly vm: Heading1ViewModel;
    readonly textSpan: TextSpanView;
    constructor(vm?: Heading1ViewModel);
    setText(text: string): void;
    setTitle(title: string): void;
}
