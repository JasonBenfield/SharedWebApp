import { AppApi } from "../Api/AppApi";
import { DefaultMenuDefinitions } from "../Api/DefaultMenuDefinitions";
import { FilteredArray, First } from "../Enumerable";
import { UrlBuilder } from "../UrlBuilder";
import { LinkCommandView } from "../Views/Command";
import { UserMenuView } from "../Views/UserMenuView";
import { MenuComponent } from "./MenuComponent";
import { MenuItemComponent } from "./MenuItemComponent";

export class UserMenuComponent extends MenuComponent {
    constructor(app: AppApi, private readonly userMenu: UserMenuView) {
        super(app, DefaultMenuDefinitions.instance.User.menuName, userMenu);
        window.addEventListener('popstate', this.onPopState.bind(this));
    }

    private onPopState() {
        const logoutMenuItem = new First(
            new FilteredArray(
                this.getComponents(),
                mi => mi.isNamed(DefaultMenuDefinitions.instance.User.links.logout)
            )
        ).value();
        this.updateLogoutUrl(logoutMenuItem);
    }

    protected configureMenuItem(menuItem: MenuItemComponent, itemView: LinkCommandView) {
        if (menuItem.isNamed(DefaultMenuDefinitions.instance.User.links.user)) {
            this.userMenu.userMenuItem(itemView);
        }
        else if (menuItem.isNamed(DefaultMenuDefinitions.instance.User.links.home)) {
            this.userMenu.homeMenuItem(itemView);
        }
        else if (menuItem.isNamed(DefaultMenuDefinitions.instance.User.links.logout)) {
            this.userMenu.logoutMenuItem(itemView);
            this.updateLogoutUrl(menuItem);
        }
    }

    private updateLogoutUrl(menuItem: MenuItemComponent) {
        let returnUrl = location.href;
        if (returnUrl.indexOf('#') > -1) {
            if (returnUrl.indexOf('?') > -1) {
                returnUrl.replace('#', '&');
            }
            else {
                returnUrl.replace('#', '?');
            }
        }
        menuItem.setHref(
            new UrlBuilder(menuItem.getUrl())
                .addQuery('ReturnUrl', encodeURIComponent(returnUrl))
                .value()
        );
    }
}