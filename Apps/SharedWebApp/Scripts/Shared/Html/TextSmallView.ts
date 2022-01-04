import { Small } from './Small';
import { SmallViewModel } from './SmallViewModel';
import { TextSpanView } from './TextSpanView';

export class TextSmallView extends Small implements ITextComponentView {
    readonly textSpan = this.addContent(new TextSpanView());

    constructor(vm: SmallViewModel = new SmallViewModel()) {
        super(vm);
    }

    setText(text: string) {
        this.textSpan.setText(text);
    }

    setTitle(title: string) {
        this.textSpan.setTitle(title);
    }
}