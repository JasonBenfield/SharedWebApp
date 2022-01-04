import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { LinkViewModel } from "./LinkViewModel";
export declare class LinkView extends HtmlContainerComponent {
    protected readonly vm: LinkViewModel;
    readonly clicked: import("../Events").DefaultEventHandler<any>;
    constructor(vm?: LinkViewModel);
    setHref(href: string): void;
    enable(): void;
    disable(): void;
}
