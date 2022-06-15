import { AggregateComponent } from "./AggregateComponent";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { LinkViewModel } from "./LinkViewModel";
import { ViewEvents } from "./ViewEvents";

export class LinkView extends HtmlContainerComponent {
    protected readonly vm: LinkViewModel;

    constructor(vm: LinkViewModel = new LinkViewModel()) {
        super(vm, new AggregateComponent(vm.content));
    }

    readonly events = new ViewEvents(this, (options) => this.vm.xtiEvent(options));

    protected setAttr: (config: (attr: ILinkAttributes) => void) => void;

    setHref(href: string) {
        this.setAttr(attr => attr.href = href);
    }

    enable() {
        this.vm.isEnabled(true);
    }

    disable() {
        this.vm.isEnabled(false);
    }
}