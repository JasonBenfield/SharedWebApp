import { CssLengthUnit } from '../../Shared/Html/CssLengthUnit';
import { GridTemplateRepeat, GridView } from '../../Shared/Html/GridView';
import { TextSpanView } from '../../Shared/Html/TextSpanView';
import { MarginCss } from '../../Shared/MarginCss';

export class DemoGrid {
    constructor(private readonly view: GridView) {
        this.view.setMargin(MarginCss.xs(0));
        this.view.addCssName('grid-light');
        this.view.setTemplateColumns(
            CssLengthUnit.px(200),
            new GridTemplateRepeat(18, CssLengthUnit.px(100)),
            CssLengthUnit.px(300)
        );
        this.view.setAutoColumns(CssLengthUnit.px(50));
        this.view.setTemplateRows(
            CssLengthUnit.px(150)
        );
        let headers = this.view.addHeaders(20);
        for (let col = 1; col <= 20; col++) {
            headers[col - 1]
                .addContent(new TextSpanView())
                .configure(ts => ts.setText(`Header ${col}`));
        }
        for (let row = 1; row <= 100; row++) {
            let cells = this.view.addCells(20);
            for (let col = 1; col <= 20; col++) {
                cells[col - 1]
                    .addContent(new TextSpanView())
                    .configure(ts => ts.setText(`Cell ${col}, ${row}`));
            }
        }
        let footers = this.view.addFooters(20);
        for (let col = 1; col <= 20; col++) {
            footers[col - 1]
                .addContent(new TextSpanView())
                .configure(ts => ts.setText(`Footer ${col}`));
        }
    }
}