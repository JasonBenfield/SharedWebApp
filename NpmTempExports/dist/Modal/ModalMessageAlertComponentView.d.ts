import { ButtonCommandItem } from "../Command/ButtonCommandItem";
import { HtmlComponent } from "../Html/HtmlComponent";
import { MessageAlertView } from "../MessageAlertView";
import { ModalComponentViewModel } from "./ModalComponentViewModel";
export declare class ModalMessageAlertComponentView extends HtmlComponent {
    private readonly modal;
    readonly alert: MessageAlertView;
    readonly okButton: ButtonCommandItem;
    readonly closed: IEventHandler<any>;
    constructor(vm?: ModalComponentViewModel);
    setBackdrop(backdrop: boolean | 'static'): void;
    showModal(): void;
    hideModal(): void;
}
