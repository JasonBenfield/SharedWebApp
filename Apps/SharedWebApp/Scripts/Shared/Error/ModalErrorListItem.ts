import { ErrorModel } from "../ErrorModel";
import { ModalErrorListItemView } from "./ModalErrorListItemView";

export class ModalErrorListItem {
    constructor(readonly error: ErrorModel, view: ModalErrorListItemView, isCaptionVisible: boolean) {
        view.setCaption(error.Caption);
        view.setMessage(error.Message);
        if (isCaptionVisible) {
            view.showCaption();
        }
        else {
            view.hideCaption();
        }
    }
}