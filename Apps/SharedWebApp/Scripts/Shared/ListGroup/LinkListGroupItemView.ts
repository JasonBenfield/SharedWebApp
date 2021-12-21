import { Link } from "../Html/Link";
import { LinkListItemViewModel } from "./LinkListItemViewModel";
import { ListGroupItemView } from "./ListGroupItemView";

export class LinkListGroupItemView extends ListGroupItemView {
    private readonly link: Link;

    constructor(vm: LinkListItemViewModel = new LinkListItemViewModel()) {
        super(vm);
        this.link = new Link(vm);
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