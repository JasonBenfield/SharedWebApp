import { LinkView } from "./LinkView";
import { LinkViewModel } from "./LinkViewModel";

export class NavLinkView extends LinkView {
    constructor(vm: LinkViewModel = new LinkViewModel()) {
        super(vm);
        this.addCssName('nav-link');
    }

    setActive() {
        this.addCssName('active');
    }

    clearActive() {
        this.removeCssName('active');
    }
}