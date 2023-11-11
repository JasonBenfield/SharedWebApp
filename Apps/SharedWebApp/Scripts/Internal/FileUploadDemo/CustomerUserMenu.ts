import { AppClient } from "../../Lib/Http/AppClient";
import { UserMenuComponent } from "../../Lib/Components/UserMenuComponent";
import { UserMenuView } from "../../Lib/Views/UserMenuView";

export class CustomUserMenu extends UserMenuComponent {
    constructor(api: AppClient, userMenu: UserMenuView) {
        super(api, userMenu);
        alert('Custom user menu!');
    }
}