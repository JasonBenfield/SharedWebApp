import { ErrorModel } from "../ErrorModel";
import { ErrorListItemView } from "./ErrorListItemView";

export class ErrorListItem {
    constructor(error: ErrorModel, view: ErrorListItemView) {
        view.setMessage(error.Message);
    }
}