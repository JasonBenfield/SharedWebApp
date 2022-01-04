import { ErrorModel } from '../ErrorModel';
import { ModalErrorComponentView } from './ModalErrorComponentView';
export declare class ModalErrorComponent {
    private readonly view;
    private readonly title;
    private readonly errorGroups;
    private readonly _errorSelected;
    readonly errorSelected: import("../Events").DefaultEventHandler<ErrorModel>;
    constructor(view: ModalErrorComponentView);
    private onClosed;
    show(errors: ErrorModel[], caption?: string): void;
    hide(): void;
    private onErrorSelected;
    private clearErrors;
}
