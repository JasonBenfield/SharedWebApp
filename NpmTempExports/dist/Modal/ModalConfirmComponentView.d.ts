import { ButtonCommandItem } from "../Command/ButtonCommandItem";
import { HtmlComponent } from "../Html/HtmlComponent";
import { TextBlockView } from "../Html/TextBlockView";
import { TextHeading5View } from "../Html/TextHeading5View";
import { ModalComponentViewModel } from "./ModalComponentViewModel";
export declare class ModalConfirmComponentView extends HtmlComponent {
    private readonly modal;
    readonly title: TextHeading5View;
    readonly message: TextBlockView;
    readonly noButton: ButtonCommandItem;
    readonly yesButton: ButtonCommandItem;
    readonly closed: IEventHandler<any>;
    constructor(vm?: ModalComponentViewModel);
    showTitle(): void;
    hideTitle(): void;
    showModal(): void;
    hideModal(): void;
}
