import { ContextualClass } from '../../Lib/ContextualClass';
import { FlexCss } from '../../Lib/FlexCss';
import { BasicPageView } from '../../Lib/Views/BasicPageView';
import { BlockView } from '../../Lib/Views/BlockView';
import { ButtonCommandView } from '../../Lib/Views/Command';
import { InputView } from '../../Lib/Views/InputView';
import { TextHeading1View } from '../../Lib/Views/TextHeadings';

export class MainPageView extends BasicPageView {
    readonly heading: TextHeading1View;
    readonly fileInput: InputView;
    readonly uploadButton: ButtonCommandView;

    constructor() {
        super();
        const flexColumn = this.addView(BlockView)
            .configure(c => {
                c.addCssName('container');
                c.setFlexCss(new FlexCss().column());
                c.height100();
                c.scrollable();
            });
        this.heading = flexColumn
            .addView(BlockView)
            .addView(TextHeading1View);
        this.fileInput = flexColumn.addView(BlockView).addView(InputView);
        this.uploadButton = flexColumn.addView(ButtonCommandView);
        this.uploadButton.setText('Upload');
        this.uploadButton.useOutlineStyle(ContextualClass.secondary);
    }
}