import { CardAlertView } from "../../Lib/Views/Card";
import { CardTitleHeaderView } from "../../Lib/Views/Card";
import { CardView } from "../../Lib/Views/Card";
import { TextBlockView } from "../../Lib/Views/TextBlockView";
import { ButtonListGroupView, GridListGroupView, ListGroupItemView, ListGroupView } from "../../Lib/Views/ListGroup";
import { BasicComponentView } from "../../Lib/Views/BasicComponentView";
import { TestClickableListItemView } from "./TestClickableItemView";
import { TestListItemView } from "./TestListItemView";
import { BasicTextComponentView } from "../../Lib/Views/BasicTextComponentView";
import { TextAreaView } from "../../Lib/Views/TextAreaView";
import { FormGroupGridView, FormGroupTextAreaView } from "../../Lib/Views/FormGroup";
import { TestGridListItemView } from "./TestGridListItemView";
import { CssLengthUnit } from "../../Lib/CssLengthUnit";

export class TestCardView extends CardView {
    readonly cardTitleHeader: CardTitleHeaderView;
    readonly alert: CardAlertView;
    readonly manualItem: BasicTextComponentView;
    readonly testItems: ListGroupView<TestListItemView>;
    readonly clickableItems: ButtonListGroupView<TestClickableListItemView>;
    readonly gridItems: GridListGroupView<TestGridListItemView>;
    readonly textArea: TextAreaView;

    constructor(container: BasicComponentView) {
        super(container);
        this.cardTitleHeader = this.addCardTitleHeader();
        this.alert = this.addCardAlert();
        const manualItems = this.addListGroup(ListGroupItemView);
        this.manualItem = manualItems.addListGroupItem()
            .addView(TextBlockView);
        this.testItems = this.addListGroup(TestListItemView);
        this.clickableItems = this.addButtonListGroup(TestClickableListItemView);
        const formGroups = this.addView(FormGroupGridView);
        const formGroup = formGroups.addFormGroup(FormGroupTextAreaView);
        formGroup.caption.setText('Text Area');
        this.textArea = formGroup.textArea;
        this.textArea.setRows(3);
        this.gridItems = this.addGridListGroup(TestGridListItemView);
        this.gridItems.setTemplateColumns(
            CssLengthUnit.flex(1),
            CssLengthUnit.flex(1),
            CssLengthUnit.flex(1)
        );
    }
}