import { EventSource } from "../Events";
import { ButtonGroupView } from "../Views/ButtonGroupView";
import { TextButtonView } from "../Views/TextButtonView";
import { TextSpanView } from "../Views/TextSpanView";
import { BasicComponent } from "./BasicComponent";
import { TextButtonComponent } from "./TextButtonComponent";
import { TextComponent } from "./TextComponent";

type Events = { buttonClicked: BasicComponent };

export class ButtonGroup extends BasicComponent {
    protected readonly view: ButtonGroupView;

    private readonly eventSource = new EventSource<Events>(this, { buttonClicked: null });
    readonly when = this.eventSource.when;

    constructor(view: ButtonGroupView) {
        super(view);
        this.view.handleClick(this.handleClick.bind(this));
    }

    private handleClick(el: HTMLElement) {
        const item = this.getComponentByElement(el);
        if (item) {
            this.eventSource.events.buttonClicked.invoke(item);
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

    protected onDipose() {
        this.eventSource.unregisterAll();
    }
}