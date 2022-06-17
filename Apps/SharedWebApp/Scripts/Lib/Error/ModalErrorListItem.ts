import { ErrorModel } from "../ErrorModel";
import { ListItem } from "../Html/ListItem";
import { TextBlock } from "../Html/TextBlock";
import { ModalErrorListItemView } from "./ModalErrorListItemView";

export class ModalErrorListItem extends ListItem {
    constructor(readonly error: ErrorModel, view: ModalErrorListItemView, isCaptionVisible: boolean) {
        super(view);
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