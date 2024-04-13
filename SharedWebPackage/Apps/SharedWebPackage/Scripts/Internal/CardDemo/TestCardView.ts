import { CssLengthUnit } from "../../Lib/CssLengthUnit";
import { BasicComponentView } from "../../Lib/Views/BasicComponentView";
import { BasicTextComponentView } from "../../Lib/Views/BasicTextComponentView";
import { CardAlertView, CardTitleHeaderView, CardView } from "../../Lib/Views/Card";
import { FormGroupContainerView } from "../../Lib/Views/FormGroupContainerView";
import { ButtonListGroupView, GridListGroupView, ListGroupItemView, ListGroupView } from "../../Lib/Views/ListGroup";
import { TextAreaView } from "../../Lib/Views/TextAreaView";
import { TextBlockView } from "../../Lib/Views/TextBlockView";
import { TestClickableListItemView } from "./TestClickableItemView";
import { TestGridListItemView } from "./TestGridListItemView";
import { TestListItemView } from "./TestListItemView";

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
        const formGroups = this.addView(FormGroupContainerView);
        const formGroup = formGroups.addFormGroupTextAreaView();
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