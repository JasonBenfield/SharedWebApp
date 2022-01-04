
export class TextBlock {
    private text: string;
    private formatTitle: (text: string) => string;

    constructor(text: string, private readonly view: ITextComponentView) {
        this.setText(text);
    }

    setText(text: string) {
        this.text = text;
        this.view.setText(text);
    }

    setTitle(title: string) { this.view.setTitle(title); }

    syncTitleWithText(format?: (text: string) => string) {
        this.formatTitle = format || ((text: string) => text);
        this.updateTitleFromText();
    }

    private updateTitleFromText() {
        if (this.formatTitle) {
            this.setTitle(this.formatTitle(this.text));
        }
    }
}