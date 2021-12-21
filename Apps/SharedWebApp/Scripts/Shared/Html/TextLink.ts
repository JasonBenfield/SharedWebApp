import { Link } from "./Link";
import { LinkViewModel } from "./LinkViewModel";
import { TextSpan } from "./TextSpan";

export class TextLink extends Link {
    readonly textSpan = this.addContent(new TextSpan());

    constructor(text: string = '', vm: LinkViewModel = new LinkViewModel()) {
        super(vm);
        this.setText(text);
    }

    setText(text: string) {
        this.textSpan.setText(text);
    }
}