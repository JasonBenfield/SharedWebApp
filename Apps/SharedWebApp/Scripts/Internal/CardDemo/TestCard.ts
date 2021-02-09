import { Card } from "../../Shared/Card/Card";
import { DelayedAction } from '../../Shared/DelayedAction';
import { Row } from "../../Shared/Grid/Row";
import { ContextualClass } from "../../Shared/ContextualClass";
import { EnumerableRange } from "../../Shared/Enumerable";
import { ColumnCss } from "../../Shared/ColumnCss";
import { BlockViewModel } from "../../Shared/Html/BlockViewModel";
import { TextBlock } from "../../Shared/Html/TextBlock";

export class TestCard extends Card {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.cardTitleHeader.setText('This is the Title');
        this.testItems.setItems(
            new EnumerableRange(1, 5).value(),
            (i, listItem) => {
                let textBlock = listItem.addContent(new TextBlock());
                textBlock.setText(`Test ${i}`);
            }
        );
        this.clickableItems.setItems(
            new EnumerableRange(1, 5).value(),
            (i, listItem) => {
                let row = listItem.addContent(new Row(vm));
                let iconColumn = row.addIconColumn(
                    'thumbs-up',
                    icon => {
                        icon.makeFixedWidth();
                        icon.setColor(ContextualClass.success);
                    }
                );
                iconColumn.setColumnCss(ColumnCss.xs('auto'));
                row.addTextColumn(`Clickable ${i}`);
            }
        );
    }

    private readonly cardTitleHeader = this.addCardTitleHeader('Original Title');
    private readonly alert = this.addCardAlert().alert;
    private readonly testItems = this.addListGroup();
    private readonly clickableItems = this.addButtonListGroup();

    refresh() {
        return this.alert.infoAction(
            'Loading...',
            () => new DelayedAction(() => { }, 5000).execute()
        );
    }
}