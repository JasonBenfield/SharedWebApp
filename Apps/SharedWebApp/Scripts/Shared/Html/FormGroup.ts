import { FormGroupView } from "./FormGroupView";
import { TextBlock } from "./TextBlock";

export class FormGroup {
    private caption: string;
    private readonly captionText: TextBlock;

    constructor(view: FormGroupView) {
        this.captionText = new TextBlock('', view.caption);
    }

    getCaption() {
        return this.caption;
    }

    setCaption(caption: string) {
        this.caption = caption;
        this.captionText.setText(caption);
    }
}