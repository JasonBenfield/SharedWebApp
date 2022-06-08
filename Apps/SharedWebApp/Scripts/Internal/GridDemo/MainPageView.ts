import { ButtonCommandItem } from '../../Shared/Command/ButtonCommandItem';
import { ContextualClass } from '../../Shared/ContextualClass';
import { Block } from '../../Shared/Html/Block';
import { Container } from '../../Shared/Html/Container';
import { CssLengthUnit } from '../../Shared/Html/CssLengthUnit';
import { FlexColumn } from '../../Shared/Html/FlexColumn';
import { FlexColumnFill } from '../../Shared/Html/FlexColumnFill';
import { GridTemplateRepeat, GridView } from '../../Shared/Html/GridView';
import { TextHeading1View } from '../../Shared/Html/TextHeading1View';
import { Toolbar } from '../../Shared/Html/Toolbar';
import { PaddingCss } from '../../Shared/PaddingCss';
import { PageFrameView } from '../../Shared/PageFrameView';

export class MainPageView {
    readonly heading: TextHeading1View;
    readonly grid: GridView;

    constructor(private readonly page: PageFrameView) {
        let flexColumn = this.page.addContent(new FlexColumn());
        this.heading = flexColumn
            .addContent(new Container())
            .addContent(new TextHeading1View());
        let flexFill = flexColumn.addContent(new FlexColumnFill());

        //let flexFill = flexColumn.addContent(new Block());
        //flexFill.flexFill();
        //flexFill.positionRelative();
        //let abs = flexFill.addContent(new Block());
        //abs.positionAbsoluteFill();
        //abs.scrollable();
        this.grid = flexFill.addContent(new GridView());
        let toolbar = flexColumn.addContent(new Toolbar());
        toolbar.setBackgroundContext(ContextualClass.secondary);
        toolbar.setPadding(PaddingCss.xs(3));
    }
}