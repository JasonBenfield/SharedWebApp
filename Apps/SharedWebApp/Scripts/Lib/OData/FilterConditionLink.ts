import { TextComponent } from "../Components/TextComponent";
import { TextLink } from "../Components/TextLink";
import { TextLinkView } from "../Views/TextLinkView";
import { FilterSelection } from "./FilterSelection";
import { SourceType } from "./SourceType";

export class FilterConditionLink extends TextLink {
    constructor(readonly selection: FilterSelection, view: TextLinkView) {
        super(view);
        new TextComponent(view).setText(selection.displayText);
    }

    sourceTypeChanged(sourceType: SourceType) {
        const canSelect = this.selection.canSelect(sourceType);
        if (canSelect) {
            this.view.show();
        }
        else {
            this.view.hide();
        }
    }
}