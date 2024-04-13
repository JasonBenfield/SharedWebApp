import { BasicComponentView } from "./BasicComponentView";
import { LinkCommandView } from "./Command";
import { DropdownMenuView } from "./Dropdown";

export class UserMenuView extends DropdownMenuView {
    constructor(container: BasicComponentView) {
        super(container);
    }

    userMenuItem(menuItem: LinkCommandView) {
        menuItem.icon.solidStyle('user');
    }

    homeMenuItem(menuItem: LinkCommandView) {
        menuItem.icon.solidStyle('home');
    }

    logoutMenuItem(menuItem: LinkCommandView) {
        menuItem.icon.solidStyle('right-from-bracket');
    }
}