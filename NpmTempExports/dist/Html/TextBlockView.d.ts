import { HtmlComponent } from "./HtmlComponent";
import { TextBlockViewModel } from "./TextBlockViewModel";
export declare class TextBlockView extends HtmlComponent implements ITextComponentView {
    readonly vm: TextBlockViewModel;
    constructor(vm?: TextBlockViewModel);
    setText(text: string): void;
    setTitle(title: string): void;
}
