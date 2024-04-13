import { Dropdown } from 'bootstrap';
import * as $ from 'jquery';
import { BasicComponentView } from "./BasicComponentView";
import { BlockView } from './BlockView';
import { ButtonView } from "./ButtonView";
import { ButtonCommandView, LinkCommandView } from './Command';
import { LinkView } from './LinkView';
import { ListItemView } from './ListItemView';
import { SpanView } from './SpanView';
import { TextLinkView } from './TextLinkView';
import { IMenuView } from './Types';
import { UnorderedListView } from './UnorderedListView';

export class DropdownContainerView extends BasicComponentView {
    readonly dropdown: DropdownComponentView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('dropdown');
        this.dropdown = this.addView(DropdownComponentView);
    }
}

export class DropdownComponentView extends BasicComponentView {
    readonly button: DropdownButtonView;
    readonly menuContainer: BlockView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.button = this.addView(DropdownButtonView);
        this.menuContainer = this.addView(BlockView);
        this.menuContainer.addCssName('dropdown-menu');
        this.menuContainer.addCssName('dropdown-menu-right');
        this.button.initialize();
    }
}

export class DropdownMenuView extends UnorderedListView implements IMenuView {
    constructor(container: BasicComponentView) {
        super(container);
    }

    addMenuItem() {
        const item = this.addLinkCommandItem();
        item.addCssName('menu-item');
        return item.link;
    }

    addSpanItem() {
        return this.addView(DropdownSpanListItemView);
    }

    addLinkItem() {
        return this.addView(DropdownLinkListItemView);
    }

    addLinkCommandItem() {
        return this.addView(DropdownLinkCommandListItemView);
    }

    addTextLinkItem() {
        return this.addView(DropdownTextLinkListItemView);
    }

    addButtunCommand() {
        const button = this.addView(ButtonCommandView);
        button.addCssName('menu-item');
        return button;
    }
}

export class DropdownButtonView extends ButtonView {
    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName('dropdown-toggle');
        this.setAttr(a => a['data-bs-toggle'] = 'dropdown');
        this.setAttr(a => a['data-toggle'] = 'dropdown');
    }

    initialize() {
        const dropdown = new Dropdown(this.elementView.element);
        $(this.elementView.element).data('bs.dropdown', dropdown);
    }
}

export class DropdownLinkListItemView extends ListItemView {
    constructor(container: BasicComponentView) {
        super(container);
        this.link = this.addView(LinkView);
        this.link.addCssName('dropdown-item')
    }

    readonly link: LinkView;
}

export class DropdownLinkCommandListItemView extends ListItemView {
    constructor(container: BasicComponentView) {
        super(container);
        this.link = this.addView(LinkCommandView);
        this.link.addCssName('dropdown-item')
    }

    readonly link: LinkCommandView;
}

export class DropdownTextLinkListItemView extends ListItemView {
    constructor(container: BasicComponentView) {
        super(container);
        this.link = this.addView(TextLinkView);
        this.link.addCssName('dropdown-item')
    }

    readonly link: TextLinkView;
}

export class DropdownSpanListItemView extends ListItemView {
    constructor(container: BasicComponentView) {
        super(container);
        this.span = this.addView(SpanView);
        this.span.addCssName('dropdown-item-text')
    }

    readonly span: SpanView;
}