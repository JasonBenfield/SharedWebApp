﻿import { FormGroupView } from "./FormGroupView";

export class FormGroup {
    private caption: string;

    constructor(private readonly view: FormGroupView) {
    }

    getCaption() {
        return this.caption;
    }

    setCaption(caption: string) {
        this.caption = caption;
        this.view.setCaption(caption);
    }
}