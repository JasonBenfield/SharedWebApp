import { ContextualClass } from '../ContextualClass';
import { FlexCss } from '../FlexCss';
import { MarginCss } from '../MarginCss';
import { AlertView } from './AlertView';
import { BasicPageView } from './BasicPageView';
import { BasicTextComponentView } from './BasicTextComponentView';
import { BlockView } from './BlockView';
import { TextBlockView } from './TextBlockView';
import { TextHeading1View } from './TextHeadings';

export class ErrorPageView extends BasicPageView {
    readonly caption: BasicTextComponentView;
    readonly message: BasicTextComponentView;

    constructor() {
        super();
        const container = this.addView(BlockView);
        container.height100();
        let flexColumn = container.addView(BlockView);
        flexColumn.setFlexCss(new FlexCss().column())
        const flexFill = flexColumn.addView(BlockView)
            .configure(b => {
                b.positionAbsoluteFill();
                b.scrollable();
            })
            .addView(BlockView)
            .configure(b => b.addCssName('container'));
        this.caption = flexFill.addView(TextHeading1View)
            .configure(h1 => h1.setMargin(MarginCss.top(3).xs({ bottom: 3 })));
        const alert = flexFill.addView(AlertView)
            .configure(a => a.setMargin(MarginCss.bottom(3)));
        alert.setContext(ContextualClass.danger);
        this.message = alert.addView(TextBlockView);
    }
}
