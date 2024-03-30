import { ContextualClass } from "../../Lib/ContextualClass";
import { BasicComponentView } from "../../Lib/Views/BasicComponentView";
import { DropdownComponentView, DropdownMenuView } from "../../Lib/Views/Dropdown";
import { GridCellView } from "../../Lib/Views/Grid";
import { TextSpanView } from "../../Lib/Views/TextSpanView";

export class ODataDropdownView extends GridCellView {
    constructor(container: BasicComponentView) {
        super(container);
        const dropdown = this.addView(DropdownComponentView);
        dropdown.button.addView(TextSpanView).setText('More');
        dropdown.button.useOutlineStyle(ContextualClass.secondary);
        const menu = dropdown.menuContainer.addView(DropdownMenuView);
        const highlightButton = menu.addTextLinkItem();
        highlightButton.addCssName('highlightButton');
        highlightButton.link.setText('Highlight');
        const warnButton = menu.addButtunCommand();
        warnButton.addCssName('warnButton');
        warnButton.setText('Warn');
    }
}