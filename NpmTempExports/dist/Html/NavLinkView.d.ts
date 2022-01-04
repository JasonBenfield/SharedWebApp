import { LinkView } from "./LinkView";
import { LinkViewModel } from "./LinkViewModel";
export declare class NavLinkView extends LinkView {
    constructor(vm?: LinkViewModel);
    setActive(): void;
    clearActive(): void;
}
