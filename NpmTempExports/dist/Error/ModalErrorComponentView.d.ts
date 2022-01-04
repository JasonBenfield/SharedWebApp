import { ButtonCommandItem } from '../Command/ButtonCommandItem';
import { HtmlComponent } from '../Html/HtmlComponent';
import { TextHeading5View } from '../Html/TextHeading5View';
import { ModalComponentViewModel } from '../Modal/ModalComponentViewModel';
import { ModalErrorGroupComponentView } from './ModalErrorGroupComponentView';
import { ModalErrorListItem } from './ModalErrorListItem';
export declare class ModalErrorComponentView extends HtmlComponent {
    private readonly modal;
    readonly title: TextHeading5View;
    private readonly body;
    private readonly _errorSelected;
    readonly errorSelected: import("../Events").DefaultEventHandler<ModalErrorListItem>;
    readonly closed: IEventHandler<any>;
    readonly okButton: ButtonCommandItem;
    private readonly errorGroups;
    constructor(vm?: ModalComponentViewModel);
    errorGroup(): ModalErrorGroupComponentView;
    clearErrorGroups(): void;
    showModal(): void;
    hideModal(): void;
}
