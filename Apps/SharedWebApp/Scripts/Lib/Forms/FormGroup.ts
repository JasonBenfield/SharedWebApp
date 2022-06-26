import { TextComponent } from "../Components/TextComponent";
import { FormGroupView } from "../Views/FormGroup";

export class FormGroup {
    private caption: string;
    private readonly captionText: TextComponent;

    constructor(view: FormGroupView) {
        this.captionText = new TextComponent(view.caption);
    }

    getCaption() {
        return this.caption;
    }

    setCaption(caption: string) {
        this.caption = caption;
        this.captionText.setText(caption);
    }
}