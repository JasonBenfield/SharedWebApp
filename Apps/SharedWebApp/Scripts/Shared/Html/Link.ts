﻿import { WebPage } from "../Api/WebPage";
import { LinkView } from "./LinkView";

export class Link {
    readonly clicked = this.view.clicked;
    private href: string;

    constructor(private readonly view: LinkView) {
        this.setHref('javascript:;');
        this.clicked.register(this.onClick.bind(this));  
    }

    private onClick() {
        if (this.href && this.href !== 'javascript:;') {
            new WebPage(this.href).open();
        }
    }

    setHref(href: string) {
        this.href = href;
        this.view.setHref(href);
    }
}