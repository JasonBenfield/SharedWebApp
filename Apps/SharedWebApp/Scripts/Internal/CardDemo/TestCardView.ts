import { CardAlertView } from "../../Lib/Views/Card";
import { CardTitleHeaderView } from "../../Lib/Views/Card";
import { CardView } from "../../Lib/Views/Card";
import { TextBlockView } from "../../Lib/Views/TextBlockView";
import { ButtonListGroupView, ListGroupView } from "../../Lib/Views/ListGroup";
import { BasicComponentView } from "../../Lib/Views/BasicComponentView";
import { TestClickableListItemView } from "./TestClickableItemView";
import { TestListItemView } from "./TestListItemView";
import { BasicTextComponentView } from "../../Lib/Views/BasicTextComponentView";
import { TextAreaView } from "../../Lib/Views/TextAreaView";
import { FormGroupGridView, FormGroupTextAreaView } from "../../Lib/Views/FormGroup";

export class TestCardView extends CardView {
    readonly cardTitleHeader: CardTitleHeaderView;
    readonly alert: CardAlertView;
    readonly manualItem: BasicTextComponentView;
    readonly testItems: ListGroupView;
    readonly clickableItems: ButtonListGroupView;
    readonly textArea: TextAreaView;

    constructor(container: BasicComponentView) {
        super(container);
        this.cardTitleHeader = this.addCardTitleHeader();
        this.alert = this.addCardAlert();
        const manualItems = this.addUnorderedListGroup();
        this.manualItem = manualItems.addListGroupItem()
            .addView(TextBlockView);
        this.testItems = this.addUnorderedListGroup();
        this.testItems.setItemViewType(TestListItemView);
        this.clickableItems = this.addButtonListGroup();
        this.clickableItems.setItemViewType(TestClickableListItemView);
        const formGroups = this.addView(FormGroupGridView);
        const formGroup = formGroups.addFormGroup(FormGroupTextAreaView);
        formGroup.caption.setText('Text Area');
        this.textArea = formGroup.textArea;
        this.textArea.setRows(3);
    }
}