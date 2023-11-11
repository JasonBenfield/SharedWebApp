import { BasicComponent } from "../Components/BasicComponent";
import { TextComponent } from "../Components/TextComponent";
import { FormGroupView } from "../Views/FormGroup";

export class FormGroup extends BasicComponent {
    private readonly captionText: TextComponent;
    private caption: string;

    constructor(view: FormGroupView) {
        super(view);
        this.captionText = this.addComponent(new TextComponent(view.caption));
        this.caption = this.captionText.getText();
    }

    getCaption() {
        return this.caption;
    }

    setCaption(caption: string) {
        this.caption = caption;
        this.captionText.setText(caption);
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}