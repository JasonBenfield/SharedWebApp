import { BodyView } from '../../Lib/Views/BodyView';
import { BlockView } from '../../Lib/Views/BlockView';
import { Heading1View } from '../../Lib/Views/Headings';
import { TextHeading3View } from '../../Lib/Views/TextHeadings';
import { ContextualClass } from '../../Lib/ContextualClass';
import { PaddingCss } from '../../Lib/PaddingCss';
import { TextBlockView } from '../../Lib/Views/TextBlockView';
import { HorizontalRuleView } from '../../Lib/Views/HorizontalRuleView';

export class MainPageView extends BlockView {
    constructor() {
        super(new BodyView());
        this.addCssName('d-contents');
        const container = this.addView(BlockView);
        container.height100();
        container.addCssName('container');
        container.setBackgroundContext(ContextualClass.primary);
        container.setPadding(PaddingCss.xs(3));
        const block = container.addView(BlockView);
        block.height100();
        block.setBackgroundContext(ContextualClass.light);
        block.on('click')
            .setAction((source) => { alert('Clicked!'); })
            .subscribe();
        block.addView(Heading1View)
            .addView(TextBlockView)
            .configure(tb => tb.setText('Heading 1'));
        block.addView(HorizontalRuleView);
        block.addView(TextHeading3View)
            .configure(th => th.setText('Heading 3'));
    }
}