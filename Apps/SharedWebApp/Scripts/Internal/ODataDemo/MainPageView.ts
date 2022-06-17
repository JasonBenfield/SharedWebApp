﻿import { ContextualClass } from '../../Lib/ContextualClass';
import { Block } from '../../Lib/Html/Block';
import { Container } from '../../Lib/Html/Container';
import { CssLengthUnit } from '../../Lib/Html/CssLengthUnit';
import { GridView } from '../../Lib/Html/GridView';
import { TextHeading1View } from '../../Lib/Html/TextHeading1View';
import { Toolbar } from '../../Lib/Html/Toolbar';
import { ODataComponentView } from '../../Lib/OData/ODataComponentView';
import { PaddingCss } from '../../Lib/PaddingCss';
import { PageFrameView } from '../../Lib/PageFrameView';

export class MainPageView {
    readonly heading: TextHeading1View;
    readonly odataComponentView: ODataComponentView;

    constructor(private readonly page: PageFrameView) {
        let layoutGrid = this.page.addContent(new GridView());
        layoutGrid.borderless();
        layoutGrid.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1));
        layoutGrid.height100();
        this.heading = layoutGrid
            .addContent(new Container())
            .addContent(new TextHeading1View());
        let fillRow = layoutGrid.addContent(new Block())
            .configure(b => {
                b.height100();
                b.addCssName('container');
                b.setPadding(PaddingCss.xs(0));
                b.setBackgroundContext(ContextualClass.light);
                b.scrollable();
            });
        this.odataComponentView = fillRow.addContent(new ODataComponentView());
        
        let toolbar = layoutGrid.addContent(new Toolbar());
        toolbar.setBackgroundContext(ContextualClass.secondary);
        toolbar.setPadding(PaddingCss.xs(3));
    }
}