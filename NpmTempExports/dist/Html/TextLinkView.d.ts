import { LinkView } from "./LinkView";
import { LinkViewModel } from "./LinkViewModel";
import { TextSpanView } from "./TextSpanView";
export declare class TextLinkView extends LinkView implements ITextComponentView {
    readonly textSpan: TextSpanView;
    constructor(vm?: LinkViewModel);
    setText(text: string): void;
    setTitle(title: string): void;
}
