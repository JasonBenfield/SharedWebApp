import { Link } from "./Link";
import { TextLinkView } from "./TextLinkView";
export declare class TextLink extends Link {
    private readonly text;
    constructor(text: string, view: TextLinkView);
    setText(text: string): void;
    setTitle(title: string): void;
    syncTitleWithText(format?: (text: string) => string): void;
}
