import { ErrorModel } from "../ErrorModel";
import { ModalErrorGroupComponentView } from "./ModalErrorGroupComponentView";
export declare class ModalErrorGroupComponent {
    private readonly view;
    private readonly caption;
    private readonly errors;
    private readonly _errorSelected;
    readonly errorSelected: import("../Events").DefaultEventHandler<ErrorModel>;
    constructor(view: ModalErrorGroupComponentView);
    private onErrorClicked;
    load(caption: string, errors: ErrorModel[], isFirst: boolean): void;
}
