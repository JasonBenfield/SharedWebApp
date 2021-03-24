import { WebPage } from "../WebPage";
import { AggregateComponent } from "./AggregateComponent";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { LinkViewModel } from "./LinkViewModel";

export class Link extends HtmlContainerComponent {
    constructor(vm: LinkViewModel = new LinkViewModel()) {
        super(vm, new AggregateComponent(vm.content));
        this.setHref('javascript:;');
        this.clicked.register(this.onClick.bind(this));  
    }

    private onClick() {
        if (this.href && this.href !== 'javascript:;') {
            new WebPage(this.href).open();
        }
    }

    protected readonly vm: LinkViewModel;

    readonly clicked = this.vm.clicked;

    private href: string;

    setHref(href: string) {
        this.href = href;
        this.vm.href(href);
    }

    enable() {
        this.vm.isEnabled(true);
    }

    disable() {
        this.vm.isEnabled(false);
    }
}