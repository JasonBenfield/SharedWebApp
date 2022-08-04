import { ContextualClass } from '../../Lib/ContextualClass';
import { BasicComponentView } from '../../Lib/Views/BasicComponentView';
import { BasicTextComponentView } from '../../Lib/Views/BasicTextComponentView';
import { FaIconView } from '../../Lib/Views/FaIconView';
import { GridListGroupItemView } from '../../Lib/Views/ListGroup';
import { TextBlockView } from '../../Lib/Views/TextBlockView';

export class DemoGridListGroupItemView extends GridListGroupItemView {
    readonly displayText: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        const icon = this.addCell()
            .addView(FaIconView);
        icon.solidStyle('thumbs-up');
        this.displayText = this.addCell()
            .addView(TextBlockView);
    }

    highlight() {
        this.setContext(ContextualClass.primary);
    }
}