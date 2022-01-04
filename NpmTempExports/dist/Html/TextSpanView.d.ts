import { TextSpanViewModel } from './TextSpanViewModel';
import { HtmlComponent } from "./HtmlComponent";
export declare class TextSpanView extends HtmlComponent implements ITextComponentView {
    protected readonly vm: TextSpanViewModel;
    constructor(vm?: TextSpanViewModel);
    setText(text: string): void;
    setTitle(title: string): void;
}
