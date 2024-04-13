import { AppClient } from "../Http/AppClient";
import { BasicComponentView } from "../Views/BasicComponentView";
import { LinkCommandView } from "../Views/Command";
import { IMenuView } from "../Views/Types";
import { BasicComponent } from "./BasicComponent";
import { MenuItemComponent } from "./MenuItemComponent";

export class MenuComponent extends BasicComponent {
    constructor(
        private readonly appClient: AppClient,
        private readonly menuName: string,
        protected readonly view: (BasicComponentView & IMenuView)
    ) {
        super(view);
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
        if (this.appClient) {
            links = await this.appClient.User.GetMenuLinks(this.menuName);
        }
        else {
            links = [];
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