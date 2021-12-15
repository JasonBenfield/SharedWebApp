import { Link } from "../Html/Link";
import { LinkListItemViewModel } from "./LinkListItemViewModel";
import { ListGroupItemView } from "./ListGroupItemView";

export class LinkListGroupItem extends ListGroupItemView {
    private readonly link: Link;

    constructor(vm: LinkListItemViewModel) {
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