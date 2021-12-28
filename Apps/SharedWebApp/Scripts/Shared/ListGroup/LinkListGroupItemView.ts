import { LinkView } from "../Html/LinkView";
import { LinkListItemViewModel } from "./LinkListItemViewModel";
import { ListGroupItemView } from "./ListGroupItemView";

export class LinkListGroupItemView extends ListGroupItemView {
    private readonly link: LinkView;

    constructor(vm: LinkListItemViewModel = new LinkListItemViewModel()) {
        super(vm);
        this.link = new LinkView(vm);
    }

    setHref(href: string) {
        this.link.setHref(href);
    }

    enable() {
        this.link.enable();
    }

    disable() {
        this.link.disable();
    }
}