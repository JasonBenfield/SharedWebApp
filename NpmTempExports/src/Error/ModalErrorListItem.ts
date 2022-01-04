import { ErrorModel } from "../ErrorModel";
import { TextBlock } from "../Html/TextBlock";
import { ModalErrorListItemView } from "./ModalErrorListItemView";

export class ModalErrorListItem {
    constructor(readonly error: ErrorModel, view: ModalErrorListItemView, isCaptionVisible: boolean) {
        new TextBlock(error.Caption, view.caption);
        new TextBlock(error.Message, view.message);
        if (isCaptionVisible) {
            view.showCaption();
        }
        else {
            view.hideCaption();
        }
    }
}