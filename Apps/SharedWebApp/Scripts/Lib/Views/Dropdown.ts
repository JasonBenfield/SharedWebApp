import { UnorderedListView } from "./UnorderedListView";
import { BasicComponentView } from "./BasicComponentView";
import { ButtonView } from "./ButtonView";
import { HtmlElementView } from "./HtmlElementView";
import { IContainerView } from "./Types";
import { Dropdown } from 'bootstrap';
import * as $ from 'jquery';

export class DropdownContainerView extends BasicComponentView {
    readonly dropdown: DropdownComponentView;

    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'div'));
        this.addCssName('dropdown');
        this.dropdown = this.addView(DropdownComponentView);
    }
}

export class DropdownComponentView extends BasicComponentView {
    readonly button: DropdownButtonView;
    readonly menu: DropdownMenuView;

    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'div'));
        this.button = this.addView(DropdownButtonView);
        this.menu = this.addView(DropdownMenuView);
        const dropdown = new Dropdown(this.elementView.element);
        $(this.elementView.element).data('bs.dropdown', dropdown);
    }
}

export class DropdownButtonView extends ButtonView {
    constructor(container: IContainerView) {
        super(container);
        this.addCssName('dropdown-toggle');
        this.setAttr(a => a['data-bs-toggle'] = 'dropdown');
        this.setAttr(a => a['data-toggle'] = 'dropdown');
    }
}

export class DropdownMenuView extends UnorderedListView {
    constructor(container: IContainerView) {
        super(container);
        this.addCssName('dropdown-menu');
        this.addCssName('dropdown-menu-right');
    }
}