import { ContextualClass } from '../../Lib/ContextualClass';
import { BasicTextComponentView } from '../../Lib/Views/BasicTextComponentView';
import { FaIconView } from '../../Lib/Views/FaIconView';
import { GridListGroupItemView } from '../../Lib/Views/ListGroup';
import { TextBlockView } from '../../Lib/Views/TextBlockView';
import { IContainerView } from '../../Lib/Views/Types';

export class DemoGridListGroupItemView extends GridListGroupItemView {
    readonly displayText: BasicTextComponentView;

    constructor(container: IContainerView) {
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