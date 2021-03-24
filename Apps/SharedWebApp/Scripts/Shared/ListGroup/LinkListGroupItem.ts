import { Link } from "../Html/Link";
import { LinkListItemViewModel } from "./LinkListItemViewModel";
import { ListGroupItem } from "./ListGroupItem";

export class LinkListGroupItem extends ListGroupItem {
    constructor(vm: LinkListItemViewModel) {
        super(vm);
        this.link = new Link(vm);
    }

    private readonly link: Link;

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