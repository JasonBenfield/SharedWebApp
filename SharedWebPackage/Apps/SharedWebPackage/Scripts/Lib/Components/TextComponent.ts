import { TextComponentView } from "../Views/Types";
import { BasicComponent } from "./BasicComponent";

export class TextComponent extends BasicComponent {
    protected readonly view: TextComponentView;
    private text: string;
    private formatTitle: (text: string) => string;
    private _data: any;

    constructor(view: TextComponentView) {
        super(view);
        this.text = view.getText();
    }

    get data() { return this._data; }

    set data(data: any) { this._data = data; }

    show() { this.view.show(); }

    hide() { this.view.hide(); }

    getText() { return this.view.getText(); }

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