import { BasicComponentView } from "../Views/BasicComponentView";
import { TextStackView } from "../Views/TextStackView";
import { ITextComponentView } from "../Views/Types";
import { BasicComponent } from "./BasicComponent";
import { TextComponent } from "./TextComponent";

export class TextStackComponent extends BasicComponent {
    constructor(protected readonly view: TextStackView) {
        super(view);
    }

    getTextComponents() { return this.getComponents() as TextComponent[]; }

    getTextValues() {
        return this.getTextComponents().map(tc => tc.getText());
    }

    clearTextValues() { this.clearComponents(); }

    setTextValues(textValues: string[]) {
        this.clearTextValues();
        for (const textValue of textValues) {
            this.addTextValue(textValue);
        }
    }

    addTextValue(text: string = '', createView: (view: TextStackView) => BasicComponentView & ITextComponentView = TextStackComponent.defaultCreateTextView) {
        const textView = createView(this.view);
        const textComponent = this.addComponent(new TextComponent(textView));
        textComponent.setText(text);
        return textComponent;
    }

    static defaultCreateTextView(view: TextStackView) {
        return view.addDefaultTextView();
    }
}