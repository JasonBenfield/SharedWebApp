import { TextButtonView } from "../Views/TextButtonView";
import { TextComponent } from "./TextComponent";

export class TextButtonComponent extends TextComponent {
    protected readonly view: TextButtonView;
    private _data: any;

    constructor(view: TextButtonView) {
        super(view);
    }

    get data() { return this._data; }

    set data(data: any) { this._data = data; }

    setActive() {
        this.view.setActive();
    }

    setInactive() {
        this.view.setInactive();
    }

}