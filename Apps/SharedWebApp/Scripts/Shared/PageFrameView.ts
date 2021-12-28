import { AlignCss } from "./AlignCss";
import { ContextualClass } from "./ContextualClass";
import { DropdownBlock } from "./Dropdown/DropdownBlock";
import { DropdownLinkItem } from "./Dropdown/DropdownLinkItem";
import { ModalErrorComponentView } from "./Error/ModalErrorComponentView";
import { FaIcon } from "./FaIcon";
import { AggregateComponent } from "./Html/AggregateComponent";
import { Block } from "./Html/Block";
import { FlexColumn } from "./Html/FlexColumn";
import { Heading1 } from "./Html/Heading1";
import { TextSmallView } from "./Html/TextSmallView";
import { TextSpanView } from "./Html/TextSpanView";
import { Toolbar } from "./Html/Toolbar";
import { PaddingCss } from "./PaddingCss";
import { PageLoader } from "./PageLoader";
import { PageViewModel } from "./PageViewModel";
import { TextCss } from "./TextCss";

export class PageFrameView {
    readonly toolbar: Toolbar;
    readonly appTitle: TextSpanView;
    readonly pageTitle: TextSmallView;

    private readonly outerContent = new AggregateComponent(this.vm.content);
    readonly content: Block;
    readonly modalError = new ModalErrorComponentView(this.vm.modalError);

    private readonly logoutMenuItem: DropdownLinkItem;

    constructor(private readonly vm: PageViewModel = new PageViewModel()) {
        let frame = this.outerContent.addContent(new FlexColumn());
        frame.setName('PageFrame');
        frame.flexFill();
        this.toolbar = frame.addContent(new Toolbar());
        this.toolbar.setName('PageFrame_MainToolbar');
        this.toolbar.setBackgroundContext(ContextualClass.primary);
        this.toolbar.setPadding(PaddingCss.xs(3));
        this.toolbar.columnStart.setTextCss(new TextCss().context(ContextualClass.light));
        let heading = this.toolbar.columnStart.addContent(new Heading1());
        this.appTitle = heading.addContent(new TextSpanView());
        this.appTitle.setText(pageContext.AppTitle);
        this.pageTitle = heading.addContent(new TextSmallView());
        this.pageTitle.setText(pageContext.PageTitle);
        this.toolbar.columnEnd.addCssFrom(new AlignCss().self(a => a.xs('center')).cssClass());
        let dropdown = this.toolbar.columnEnd.addContent(new DropdownBlock());
        if (!pageContext.IsAuthenticated) {
            dropdown.hide();
        }
        dropdown.button.setContext(ContextualClass.light);
        dropdown.button.useOutlineStyle();
        dropdown.button.addContent(new FaIcon('user'));
        let userName = dropdown
            .addSpanItem()
            .span
            .addContent(new TextSpanView());
        userName.setText(pageContext.UserName);
        this.logoutMenuItem = dropdown.addLinkItem();
        let logoutTextSpan = this.logoutMenuItem.link.addContent(new TextSpanView());
        logoutTextSpan.setText('Logout');
        this.logoutMenuItem.link.setHref(`${pageContext.BaseUrl}/Hub/Current/Auth/Logout`);
        this.content = frame.addContent(new Block());
        this.content.flexFill();
        this.content.addCssName('h-100');
        this.content.setName('PageFrame_Content');
        let documentTitle = pageContext.AppTitle;
        if (pageContext.PageTitle) {
            documentTitle = `${documentTitle} - ${pageContext.PageTitle}`;
        }
        document.title = documentTitle;
    }

    setName(name: string) {
        this.outerContent.setName(name);
    }

    addItem<TItemVM extends IComponentViewModel, TItem extends IComponent>(itemVM: TItemVM, item: TItem): TItem {
        return this.content.addItem(itemVM, item);
    }

    insertItem<TItemVM extends IComponentViewModel, TItem extends IComponent>(index: number, itemVM: TItemVM, item: TItem): TItem {
        return this.content.insertItem(index, itemVM, item);
    }

    removeItem<TItem extends IComponent>(item: TItem) {
        return this.content.removeItem(item);
    }

    show() {
        this.content.show();
    }

    hide() {
        this.content.hide();
    }

    insertContent<TItem extends IComponent>(index: number, item: TItem) {
        return item.insertIntoContainer(this.content, index);
    }

    addContent<TItem extends IComponent>(item: TItem) {
        return item.addToContainer(this.content);
    }

    load() {
        new PageLoader().loadPage(this.vm);
    }
}