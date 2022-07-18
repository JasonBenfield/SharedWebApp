import { Dropdown } from 'bootstrap';
import * as $ from 'jquery';
import { BasicComponentView } from "./BasicComponentView";
import { ButtonView } from "./ButtonView";
import { LinkView } from './LinkView';
import { ListItemView } from './ListItemView';
import { SpanView } from './SpanView';
import { TextLinkView } from './TextLinkView';
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
    readonly menu: DropdownMenuView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.button = this.addView(DropdownButtonView);
        this.menu = this.addView(DropdownMenuView);
        const dropdown = new Dropdown(this.elementView.element);
        $(this.elementView.element).data('bs.dropdown', dropdown);
    }
}

export class DropdownButtonView extends ButtonView {
    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName('dropdown-toggle');
        this.setAttr(a => a['data-bs-toggle'] = 'dropdown');
        this.setAttr(a => a['data-toggle'] = 'dropdown');
    }
}

export class DropdownMenuView extends UnorderedListView {
    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName('dropdown-menu');
        this.addCssName('dropdown-menu-right');
    }

    addSpanItem() {
        return this.addView(DropdownSpanListItemView);
    }

    addLinkItem() {
        return this.addView(DropdownLinkListItemView);
    }

    addTextLinkItem() {
        return this.addView(DropdownTextLinkListItemView);
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