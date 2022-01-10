import { AggregateComponent } from "./AggregateComponent";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { LinkViewModel } from "./LinkViewModel";

export class LinkView extends HtmlContainerComponent {
    protected readonly vm: LinkViewModel;
    readonly clicked = this.vm.clicked;

    constructor(vm: LinkViewModel = new LinkViewModel()) {
        super(vm, new AggregateComponent(vm.content));
    }

    defaultClick() {
        this.vm.defaultClick();
    }

    overrideDefaultClick() {
        this.vm.overrideDefaultClick();
    }

    setHref(href: string) {
        this.vm.href(href);
    }

    enable() {
        this.vm.isEnabled(true);
    }

    disable() {
        this.vm.isEnabled(false);
    }
}