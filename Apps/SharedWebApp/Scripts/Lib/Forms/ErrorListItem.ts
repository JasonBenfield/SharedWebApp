import { BasicComponent } from "../Components/BasicComponent";
import { TextComponent } from "../Components/TextComponent";
import { ErrorModel } from "../ErrorModel";
import { ErrorListItemView } from "../Views/ErrorListItemView";

export class ErrorListItem extends BasicComponent {
    constructor(error: ErrorModel, view: ErrorListItemView) {
        super(view);
        new TextComponent(view.message).setText(error.Message);
    }
}