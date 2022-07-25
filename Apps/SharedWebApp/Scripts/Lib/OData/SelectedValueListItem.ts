import { BasicComponent } from "../Components/BasicComponent";
import { SelectedValueListItemView } from "../OData/SelectedValueListItemView";

export class SelectedValueListItem extends BasicComponent {
    constructor(readonly value: any, displayText: string, view: SelectedValueListItemView) {
        super(view);
        view.valueText.setText(displayText);
    }
}