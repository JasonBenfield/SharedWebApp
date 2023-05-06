import { AppApi } from "../Api/AppApi";
import { ParsedDateObject } from "../Api/ParsedDateObject";
import { BasicComponentView } from "../Views/BasicComponentView";
import { LinkCommandView } from "../Views/Command";
import { IMenuView } from "../Views/Types";
import { BasicComponent } from "./BasicComponent";
import { MenuItemComponent } from "./MenuItemComponent";

interface IMenuCache {
    readonly links: ILinkModel[];
    readonly expirationTime: Date;
}

class MenuCache {
    private readonly cacheKey: string;
    private cache: IMenuCache;

    constructor(menuName: string) {
        this.cacheKey = `${pageContext.AppTitle}_menu_${menuName}`;
        const serializedMenu = localStorage.getItem(this.cacheKey);
        if (serializedMenu) {
            this.cache = new ParsedDateObject(JSON.parse(serializedMenu)).value;
        }
    }

    hasLinks() {
        return this.cache && this.cache.expirationTime > new Date();
    }

    getLinks() {
        return this.cache && this.cache.links;
    }

    storeLinks(links: ILinkModel[]) {
        const expirationTime = new Date();
        expirationTime.setDate(expirationTime.getDate() + 1);
        this.cache = { links: links, expirationTime: expirationTime };
        localStorage.setItem(this.cacheKey, JSON.stringify(this.cache));
    }
}

export class MenuComponent extends BasicComponent {
    private readonly cache: MenuCache;

    constructor(
        private readonly app: AppApi,
        private readonly menuName: string,
        protected readonly view: (BasicComponentView & IMenuView)
    ) {
        super(view);
        this.cache = new MenuCache(menuName);
    }

    handleClick(action: (item: MenuItemComponent, evt: JQuery.Event) => void) {
        this.view.on('click')
            .select('a.menu-item')
            .execute(this._handleClick.bind(this, action))
            .subscribe();
    }

    private _handleClick(
        action: (item: MenuItemComponent, evt: JQuery.Event) => void,
        el: HTMLElement,
        evt: JQuery.Event
    ) {
        const item = this.getComponentByElement(el) as MenuItemComponent;
        if (item) {
            action(item, evt);
        }
    }

    protected getComponents: () => MenuItemComponent[];

    async refresh() {
        let links: ILinkModel[];
        if (this.cache.hasLinks()) {
            links = this.cache.getLinks();
        }
        else {
            if (this.app) {
                links = await this.app.User.GetMenuLinks(this.menuName);
            }
            else {
                links = [];
            }
            this.cache.storeLinks(links);
        }
        for (const link of links) {
            const itemView = this.view.addMenuItem();
            const menuItem = new MenuItemComponent(link, itemView);
            this.configureMenuItem(menuItem, itemView);
            this.addComponent(menuItem);
        }
    }

    protected configureMenuItem(item: MenuItemComponent, itemView: LinkCommandView) {
    }
}