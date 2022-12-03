import { UrlBuilder } from "../UrlBuilder";
import { LinkCommandView } from "../Views/Command";
import { BasicComponent } from "./BasicComponent";
import { TextLinkComponent } from "./TextLinkComponent";

export class MenuItemComponent extends BasicComponent {
    private readonly link: TextLinkComponent;

    constructor(private readonly linkModel: ILinkModel, view: LinkCommandView) {
        super(view);
        this.link = new TextLinkComponent(view);
        view.setViewName(`menuItem_${linkModel.LinkName}`);
        this.link.setText(linkModel.DisplayText);
        if (linkModel.Url) {
            this.link.setHref(
                new UrlBuilder(linkModel.Url)
                    .addQuery('CacheBust', pageContext.CacheBust)
                    .value()
            );
        }
    }

    getUrl() {
        return this.linkModel.Url;
    }

    isNamed(name: string) {
        return this.linkModel.LinkName === name;
    }

    setHref(href: string) {
        this.link.setHref(href);
    }
}