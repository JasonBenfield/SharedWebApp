import { AppApi } from "../../Lib/Api/AppApi";
import { UserMenuComponent } from "../../Lib/Components/UserMenuComponent";
import { UserMenuView } from "../../Lib/Views/UserMenuView";

export class CustomUserMenu extends UserMenuComponent {
    constructor(api: AppApi, userMenu: UserMenuView) {
        super(api, userMenu);
        alert('Custom user menu!');
    }
}