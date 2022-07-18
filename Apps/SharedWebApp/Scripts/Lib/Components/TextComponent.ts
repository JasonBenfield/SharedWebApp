﻿import { BasicComponentView } from "../Views/BasicComponentView";
import { ITextComponentView } from "../Views/Types";
import { BasicComponent } from "./BasicComponent";

export class TextComponent extends BasicComponent {
    protected readonly view: BasicComponentView & ITextComponentView;
    private text: string;
    private formatTitle: (text: string) => string;

    constructor(view: BasicComponentView & ITextComponentView) {
        super(view);
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }

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