import { FlexCss } from "../FlexCss";
import { TextCss } from "../TextCss";
import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { ButtonView } from "./ButtonView";
import { ButtonCommandView, LinkCommandView } from "./Command";
import { LinkView } from "./LinkView";
import { TextButtonView } from "./TextButtonView";
import { TextLinkView } from "./TextLinkView";
import { IMenuView, ViewConstructor } from "./Types";

export class NavView extends BasicContainerView implements IMenuView {
    private _configListItem: (listItem: BasicComponentView) => void = () => { };

    constructor(container: BasicComponentView) {
        super(container, 'nav');
        this.addCssName('nav');
    }

    pills() {
        this.addCssName('nav-pills');
    }

    justified() {
        this.addCssName('nav-justified');
    }

    setFlexCss(flexCss: FlexCss) {
        this.setCss('flex', flexCss && flexCss.cssClass().toString());
    }

    configListItem(configListItem: (listItem: BasicComponentView) => void) {
        this._configListItem = configListItem;
        for (const item of this.getViews()) {
            this._configListItem(item);
        }
    }

    addMenuItem() {
        const menuItem = this.addLinkCommand();
        menuItem.addCssName('menu-item');
        return menuItem;
    }

    addButton() {
        const button = this.addView(ButtonView);
        button.addCssName('nav-link');
        this._configListItem(button);
        return button;
    }

    addTextButton() {
        const textButton = this.addView(TextButtonView);
        textButton.addCssName('nav-link');
        this._configListItem(textButton);
        return textButton;
    }

    addButtonCommand() {
        const buttonCommand = this.addView(ButtonCommandView);
        buttonCommand.addCssName('nav-link');
        this._configListItem(buttonCommand);
        return buttonCommand;
    }

    addTextLink() {
        return this.addTextLinks(1)[0];
    }

    addTextLinks(howMany: number) {
        return this.addLinkViews(howMany, TextLinkView);
    }

    addLinkCommand() {
        const link = this.addLinkViews(1, LinkCommandView)[0];
        link.setTextCss(new TextCss().start());
        return link;
    }

    addLink() {
        return this.addLinks(1)[0];
    }

    addLinks(howMany: number) {
        return this.addLinkViews(howMany, LinkView);
    }

    protected addLinkViews<TView extends BasicComponentView>(howMany: number, ctor: ViewConstructor<TView>) {
        const links: TView[] = [];
        for (let i = 0; i < howMany; i++) {
            const link = this.addView(ctor);
            link.addCssName('nav-link');
            this._configListItem(link);
            links.push(link);
        }
        return links;
    }
}