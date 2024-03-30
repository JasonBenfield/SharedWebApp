import { BasicComponent } from "../Components/BasicComponent";
import { SuggestedValueListItemView } from "./SuggestedValueListItemView";

export class SuggestedValueListItem extends BasicComponent {
    constructor(readonly value: any, displayText: string, view: SuggestedValueListItemView) {
        super(view);
        view.valueText.setText(displayText);
    }
}