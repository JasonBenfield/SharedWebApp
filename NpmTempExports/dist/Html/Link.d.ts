import { LinkView } from "./LinkView";
export declare class Link {
    private readonly view;
    readonly clicked: import("../Events").DefaultEventHandler<any>;
    private href;
    constructor(view: LinkView);
    private onClick;
    setHref(href: string): void;
}
