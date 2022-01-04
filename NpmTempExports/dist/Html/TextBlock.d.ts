export declare class TextBlock {
    private readonly view;
    private text;
    private formatTitle;
    constructor(text: string, view: ITextComponentView);
    setText(text: string): void;
    setTitle(title: string): void;
    syncTitleWithText(format?: (text: string) => string): void;
    private updateTitleFromText;
}
