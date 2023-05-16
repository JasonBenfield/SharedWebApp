import { ContextualClass } from '../../Lib/ContextualClass';
import { FlexCss } from '../../Lib/FlexCss';
import { BlockView } from '../../Lib/Views/BlockView';
import { ButtonCommandView, LinkCommandView } from '../../Lib/Views/Command';
import { InputView } from '../../Lib/Views/InputView';
import { TextHeading1View } from '../../Lib/Views/TextHeadings';
import { TextLinkView } from '../../Lib/Views/TextLinkView';
import { SharedPageView } from '../SharedPageView';
import { ImgView } from '../../Lib/Views/ImgView';

export class MainPageView extends SharedPageView {
    readonly heading: TextHeading1View;
    readonly fileInput: InputView;
    readonly uploadButton: ButtonCommandView;
    readonly linkView: TextLinkView;
    readonly linkCommandView: LinkCommandView;

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
        const block = flexColumn.addView(BlockView);
        this.linkView = block.addView(TextLinkView);
        this.linkView.setText('Link 1');
        this.linkCommandView = block.addView(LinkCommandView);
        this.linkCommandView.icon.solidStyle('arrow-right');
        this.linkCommandView.setText('Link Command');
        this.linkCommandView.useOutlineStyle(ContextualClass.primary);
        const imgView = flexColumn.addView(BlockView).addView(ImgView);
        imgView.setSrc('https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg');
    }
}