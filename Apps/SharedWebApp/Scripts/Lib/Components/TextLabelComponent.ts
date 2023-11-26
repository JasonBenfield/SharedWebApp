import { BasicComponentView } from "../Views/BasicComponentView";
import { ILabelView, ITextComponentView } from "../Views/Types";
import { BasicComponent } from "./BasicComponent";

export class TextLabelComponent extends BasicComponent {
    private text: string;
    private formatTitle: (text: string) => string;
    private _data: any;

    constructor(protected readonly view: BasicComponentView & ITextComponentView & ILabelView) {
        super(view);
    }

    get data() { return this._data; }

    set data(data: any) { this._data = data; }

    show() { this.view.show(); }

    hide() { this.view.hide(); }

    setFor(component: BasicComponent) {
        this.view.setFor(component.getViewID());
    }

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