import { TextStackComponent } from "../Components/TextStackComponent";
import { BasicComponentView } from "../Views/BasicComponentView";
import { FormGroupTextStackView } from "../Views/FormGroup";
import { TextStackView } from "../Views/TextStackView";
import { ITextComponentView } from "../Views/Types";
import { FormGroup } from "./FormGroup";

export class FormGroupTextStack extends FormGroup {
    private readonly textStackComponent: TextStackComponent;

    constructor(protected readonly view: FormGroupTextStackView) {
        super(view);
        this.textStackComponent = this.addComponent(new TextStackComponent(view.textStackView));
    }

    getTextComponents() { return this.textStackComponent.getTextComponents(); }

    clearTextValues() { this.textStackComponent.clearTextValues(); }

    addTextValue(text: string = "", createView: (view: TextStackView) => BasicComponentView & ITextComponentView = TextStackComponent.defaultCreateTextView) {
        return this.textStackComponent.addTextValue(text, createView);
    }

    getValue() { return this.textStackComponent.getTextValues(); }

    setValue(...textValues: string[]) {
        this.textStackComponent.setTextValues(...textValues);
    }
}