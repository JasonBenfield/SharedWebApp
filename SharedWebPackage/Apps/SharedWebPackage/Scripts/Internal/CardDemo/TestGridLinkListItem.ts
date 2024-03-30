import { BasicComponent } from "../../Lib/Components/BasicComponent";
import { TextComponent } from "../../Lib/Components/TextComponent";
import { TestGridLinkListItemView } from "./TestGridLinkListItemView";
import { LinkComponent } from '../../Lib/Components/LinkComponent';

export class TestGridLinkListItem extends BasicComponent {
    constructor(i: number, view: TestGridLinkListItemView) {
        super(view);
        const linkComponent = new LinkComponent(view);
        linkComponent.setHref('https://example.com');
        linkComponent.setTargetToBlank();
        new TextComponent(view.cell1).setText(`Link Cell ${i}, 1`);
        new TextComponent(view.cell2).setText(`Link Cell ${i}, 2`);
        new TextComponent(view.cell3).setText(`Link Cell ${i}, 3`);
    }
}