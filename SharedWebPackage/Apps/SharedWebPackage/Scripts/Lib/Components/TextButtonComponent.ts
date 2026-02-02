import { TextButtonView } from "../Views/TextButtonView";
import { TextComponent } from "./TextComponent";

export class TextButtonComponent extends TextComponent {
    declare protected readonly view: TextButtonView;

    constructor(view: TextButtonView) {
        super(view);
    }

    setActive() {
        this.view.setActive();
    }

    setInactive() {
        this.view.setInactive();
    }

}