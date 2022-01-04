import { ButtonViewModel } from "./ButtonViewModel";
import { ContextualClass } from "../ContextualClass";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
export declare class Button extends HtmlContainerComponent {
    protected readonly vm: ButtonViewModel;
    private context;
    private isOutline;
    readonly clicked: import("../Events").DefaultEventHandler<any>;
    constructor(vm?: ButtonViewModel);
    changeTypeToSubmit(): void;
    enable(): void;
    disable(): void;
    setContext(context: ContextualClass): void;
    private getContextCss;
    useOutlineStyle(): void;
}
