import { ContextualClass } from "../../Lib/ContextualClass";
import { BasicComponentView } from "../../Lib/Views/BasicComponentView";
import { DropdownComponentView } from "../../Lib/Views/Dropdown";
import { GridCellView } from "../../Lib/Views/Grid";
import { TextSpanView } from "../../Lib/Views/TextSpanView";

export class ODataDropdownView extends GridCellView {
    constructor(container: BasicComponentView) {
        super(container);
        const dropdown = this.addView(DropdownComponentView);
        dropdown.button.addView(TextSpanView).setText('More');
        dropdown.button.useOutlineStyle(ContextualClass.secondary);
        const highlightButton = dropdown.menu.addTextLinkItem();
        highlightButton.addCssName('highlightButton');
        highlightButton.link.setText('Highlight');
        const warnButton = dropdown.menu.addTextLinkItem();
        warnButton.addCssName('warnButton');
        warnButton.link.setText('Warn');
    }
}