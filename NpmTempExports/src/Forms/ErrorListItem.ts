import { ErrorModel } from "../ErrorModel";
import { TextBlock } from "../Html/TextBlock";
import { ErrorListItemView } from "./ErrorListItemView";

export class ErrorListItem {
    constructor(error: ErrorModel, view: ErrorListItemView) {
        new TextBlock(error.Message, view.message);
    }
}