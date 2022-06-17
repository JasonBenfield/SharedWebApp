import { ContextualClass } from '../../Lib/ContextualClass';
import { CssLengthUnit } from '../../Lib/Html/CssLengthUnit';
import { GridTemplateRepeat, GridView } from '../../Lib/Html/GridView';
import { TextSpanView } from '../../Lib/Html/TextSpanView';
import { MarginCss } from '../../Lib/MarginCss';

export class DemoGrid {
    constructor(private readonly view: GridView) {
        this.view.setMargin(MarginCss.xs(0));
        this.view.setContext(ContextualClass.light);
        this.view.setTemplateColumns(
            CssLengthUnit.px(200),
            new GridTemplateRepeat(18, CssLengthUnit.px(100)),
            CssLengthUnit.px(300)
        );
        this.view.setAutoColumns(CssLengthUnit.px(50));
        this.view.setTemplateRows(
            CssLengthUnit.px(150)
        );
        let headerRow = this.view.addRow();
        headerRow.setContext(ContextualClass.secondary);
        headerRow.addCssName('fw-bold');
        let headers = headerRow.addCells(20);
        for (let col = 1; col <= 20; col++) {
            headers[col - 1]
                .configure(h => {
                    h.stickyAtTop();
                    if (col === 1) {
                        h.stickyAtLeft();
                        h.setZIndex(3);
                    }
                    else {
                        h.setZIndex(2);
                    }
                })
                .addContent(new TextSpanView())
                .configure(ts => ts.setText(`Header ${col}`));
        }
        for (let row = 1; row <= 100; row++) {
            let dataRow = this.view.addRow();
            let cells = dataRow.addCells(20);
            for (let col = 1; col <= 20; col++) {
                cells[col - 1]
                    .configure(c => {
                        if (col === 1) {
                            c.stickyAtLeft();
                            c.setZIndex(1);
                        }
                    })
                    .addContent(new TextSpanView())
                    .configure(ts => ts.setText(`Cell ${col}, ${row}`));
            }
        }
        let footerRow = this.view.addRow();
        let footers = footerRow.addCells(20);
        for (let col = 1; col <= 20; col++) {
            footers[col - 1]
                .configure(f => {
                    f.stickyAtBottom();
                    if (col === 1) {
                        f.stickyAtLeft();
                        f.setZIndex(3);
                    }
                    else {
                        f.setZIndex(2);
                    }
                })
                .addContent(new TextSpanView())
                .configure(ts => ts.setText(`Footer ${col}`));
        }
    }
}