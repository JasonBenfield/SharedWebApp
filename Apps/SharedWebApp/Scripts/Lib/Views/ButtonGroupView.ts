import { BasicComponentView } from "./BasicComponentView";
import { ButtonView } from "./ButtonView";
import { ButtonCommandView } from "./Command";
import { TextButtonView } from "./TextButtonView";
import { TextSpanView } from "./TextSpanView";
import { ViewEventActionBuilder } from "./ViewEventBuilder";

export class ButtonGroupView extends BasicComponentView {
    private clickConfig: (builder: ViewEventActionBuilder) => ViewEventActionBuilder;
    private readonly buttonStyles: { [name: string]: (buttonView: ButtonView) => void } = {};
    private readonly textButtonStyles: { [name: string]: (buttonView: TextButtonView) => void } = {};
    private readonly textStyles: { [name: string]: (textView: TextSpanView) => void } = {};

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('btn-group');
        this.clickConfig = b => b.select('button');
        this.styleButtonDefault(() => { });
        this.styleTextButtonDefault(() => { });
        this.styleTextDefault(() => { });
    }

    styleButtonDefault(style: (buttonView: ButtonView) => void) {
        this.styleButton('default', style);
    }

    styleButton(name: string, style: (buttonView: ButtonView) => void) {
        this.buttonStyles[name] = style;
    }

    styleTextButtonDefault(style: (buttonView: TextButtonView) => void) {
        this.styleTextButton('default', style);
    }

    styleTextButton(name: string, style: (buttonView: TextButtonView) => void) {
        this.textButtonStyles[name] = style;
    }

    styleTextDefault(style: (labelView: TextSpanView) => void) {
        this.styleText('default', style);
    }

    styleText(name: string, style: (labelView: TextSpanView) => void) {
        this.textStyles[name] = style;
    }

    configureClick(clickConfig: (builder: ViewEventActionBuilder) => ViewEventActionBuilder) {
        this.clickConfig = clickConfig;
    }

    handleClick(action: (el: HTMLElement) => void) {
        this.clickConfig(this.on('click').execute(action)).subscribe();
    }

    disposeAllViews: () => void;

    addButton(styleName = 'default') {
        const button = this.addView(ButtonView);
        (this.buttonStyles[styleName || 'default'] || this.buttonStyles['default'])(button);
        return button;
    }

    addButtonCommand() {
        const button = this.addView(ButtonCommandView);
        return button;
    }

    addTextButton(styleName = 'default') {
        const button = this.addView(TextButtonView);
        (this.textButtonStyles[styleName] || this.textButtonStyles['default'])(button);
        return button;
    }

    addText(styleName = 'default') {
        const text = this.addView(TextSpanView);
        (this.textStyles[styleName] || this.textStyles['default'])(text);
        text.addCssName('col-form-label');
        return text;
    }
}