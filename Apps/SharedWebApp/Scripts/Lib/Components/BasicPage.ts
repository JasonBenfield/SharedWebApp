﻿import { AppApi } from "../Api/AppApi";
import { HostEnvironment } from "../HostEnvironment";
import { BasicPageView } from "../Views/BasicPageView";
import { TextComponent } from "./TextComponent";
import { UserMenuComponent } from "./UserMenuComponent";

export class BasicPage {
    protected readonly userMenu: UserMenuComponent;

    constructor(protected readonly defaultApi: AppApi, protected readonly view: BasicPageView) {
        new TextComponent(view.appTitle).setText(pageContext.AppTitle);
        new TextComponent(view.pageTitle).setText(pageContext.PageTitle);
        const environmentName = new TextComponent(view.environmentName);
        environmentName.setText(pageContext.EnvironmentName);
        environmentName.syncTitleWithText();
        const env = new HostEnvironment();
        if (env.isProduction) {
            view.hideEnvironmentBox();
        }
        this.userMenu = this.createUserMenu();
        if (!pageContext.IsAuthenticated) {
            view.hideUserDropdown();
        }
        if (pageContext.IsAuthenticated && this.defaultApi) {
            this.userMenu.refresh();
        }
        const documentTitle = pageContext.PageTitle ?
            `${pageContext.AppTitle} - ${pageContext.PageTitle}` :
            pageContext.AppTitle;
        view.setDocumentTitle(documentTitle);
    }

    protected createUserMenu() {
        return new UserMenuComponent(this.defaultApi, this.view.userMenu);
    }
}