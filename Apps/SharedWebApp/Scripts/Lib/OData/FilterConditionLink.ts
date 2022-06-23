import { TextBlock } from "../Html/TextBlock";
import { TextNavLinkView } from "../Html/TextNavLinkView";
import { FilterSelection } from "./FilterSelection";
import { SourceType } from "./SourceType";

export class FilterConditionLink {
    constructor(readonly selection: FilterSelection, private readonly view: TextNavLinkView) {
        new TextBlock(selection.displayText, view);
    }

    hasView(view: TextNavLinkView) { return this.view === view; }

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