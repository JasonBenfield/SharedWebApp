import { ErrorModel } from "../ErrorModel";
import { ModalErrorListItemView } from "./ModalErrorListItemView";
export declare class ModalErrorListItem {
    readonly error: ErrorModel;
    constructor(error: ErrorModel, view: ModalErrorListItemView, isCaptionVisible: boolean);
}
