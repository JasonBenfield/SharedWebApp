import { BasicComponent } from "../Components/BasicComponent";
import { LabelComponent } from "../Components/LabelComponent";
import { TextComponent } from "../Components/TextComponent";
import { FormGroupView } from "../Views/FormGroup";

export class FormGroup extends BasicComponent {
    private readonly labelComponent: LabelComponent;
    private readonly captionText: TextComponent;
    private caption: string;

    constructor(protected readonly view: FormGroupView) {
        super(view);
        this.labelComponent = this.addComponent(new LabelComponent(view.captionLabel));
        this.captionText = this.addComponent(new TextComponent(view.caption));
        this.caption = this.captionText.getText();
    }
    
    protected setLabelFor(component: BasicComponent | string) {
        this.labelComponent.setFor(component);
    }

    getCaption() {
        return this.caption;
    }

    setCaption(caption: string) {
        this.caption = caption;
        this.captionText.setText(caption);
    }

    getValue() { return null; }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}