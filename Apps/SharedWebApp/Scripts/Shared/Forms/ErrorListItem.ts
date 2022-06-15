import { ErrorModel } from "../ErrorModel";
import { ListItem } from "../Html/ListItem";
import { TextBlock } from "../Html/TextBlock";
import { ErrorListItemView } from "./ErrorListItemView";

export class ErrorListItem extends ListItem {
    constructor(error: ErrorModel, view: ErrorListItemView) {
        super(view);
        new TextBlock(error.Message, view.message);
    }
}