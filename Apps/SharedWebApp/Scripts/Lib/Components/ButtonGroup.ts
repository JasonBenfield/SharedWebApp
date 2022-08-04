import { DefaultEvent } from "../Events";
import { ButtonGroupView } from "../Views/ButtonGroupView";
import { ButtonView } from "../Views/ButtonView";
import { TextButtonView } from "../Views/TextButtonView";
import { TextSpanView } from "../Views/TextSpanView";
import { BasicComponent } from "./BasicComponent";
import { TextButtonComponent } from "./TextButtonComponent";
import { TextComponent } from "./TextComponent";

export class ButtonGroup extends BasicComponent {
    protected readonly view: ButtonGroupView;
    private buttonClicked: DefaultEvent<BasicComponent>;

    constructor(view: ButtonGroupView) {
        super(view);
    }

    registerButtonClicked(action: (item: BasicComponent) => void) {
        if (!this.buttonClicked) {
            this.buttonClicked = new DefaultEvent<TextButtonComponent>(this);
            this.view.handleClick(this.handleClick.bind(this));
        }
        this.buttonClicked.register(action);
    }

    private handleClick(el: HTMLElement) {
        const item = this.getComponentByElement(el);
        if (item) {
            this.buttonClicked.invoke(item);
        }
    }

    getItems() { return this.getComponents(); }

    clearItems() {
        this.clearComponents();
    }

    addTextButton(createButton?: (buttonView: TextButtonView) => TextButtonComponent, styleName: string = 'default') {
        const buttonView = this.view.addTextButton(styleName);
        const button = createButton ? createButton(buttonView) : new TextButtonComponent(buttonView);
        this.addComponent(button);
        return button;
    }

    addText(create?: (textView: TextSpanView) => TextComponent) {
        const textView = this.view.addText();
        const text = create ? create(textView) : new TextComponent(textView);
        this.addComponent(text);
        return text;
    }

    removeItem(itemToRemove: BasicComponent) {
        this.removeComponent(itemToRemove);
    }
}