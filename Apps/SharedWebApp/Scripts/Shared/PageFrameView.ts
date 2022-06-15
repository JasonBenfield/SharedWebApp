import { AlignCss } from "./AlignCss";
import { XtiUrl } from "./Api/XtiUrl";
import { ContextualClass } from "./ContextualClass";
import { DropdownBlock } from "./Dropdown/DropdownBlock";
import { ModalErrorComponentView } from "./Error/ModalErrorComponentView";
import { FaIcon } from "./FaIcon";
import { AggregateComponent } from "./Html/AggregateComponent";
import { Block } from "./Html/Block";
import { CssLengthUnit } from "./Html/CssLengthUnit";
import { FlexColumn } from "./Html/FlexColumn";
import { GridView } from "./Html/GridView";
import { Heading1 } from "./Html/Heading1";
import { Link } from "./Html/Link";
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

    private readonly outerContent = new AggregateComponent(this.view.content);
    readonly content: Block;
    readonly modalError = new ModalErrorComponentView(this.view.modalError);

    readonly userDropdown: DropdownBlock;

    constructor(private readonly view: PageViewModel = new PageViewModel()) {
        let grid = this.outerContent.addContent(new GridView());
        grid.borderless();
        grid.height100();
        grid.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1));
        grid.setName('PageFrame');
        this.toolbar = grid.addContent(new Toolbar());
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
        this.userDropdown = this.toolbar.columnEnd.addContent(new DropdownBlock());
        if (!pageContext.IsAuthenticated) {
            this.userDropdown.hide();
        }
        this.userDropdown.button.setContext(ContextualClass.light);
        this.userDropdown.button.useOutlineStyle();
        this.userDropdown.button.addContent(new FaIcon('user'));
        let userName = this.userDropdown
            .addSpanItem()
            .span
            .addContent(new TextSpanView());
        userName.setText(pageContext.UserName);
        let homeMenuItem = this.userDropdown.addLinkItem();
        homeMenuItem.link.addContent(new FaIcon())
            .configure(i => i.solidStyle('house'));
        let homeTextSpan = homeMenuItem.link.addContent(new TextSpanView());
        homeTextSpan.setText('Home');
        let homeLink = new Link(homeMenuItem.link);
        homeLink.setHref(XtiUrl.current().homeUrl());
        let logoutMenuItem = this.userDropdown.addLinkItem();
        logoutMenuItem.link.addContent(new FaIcon())
            .configure(i => i.solidStyle('right-from-bracket'));
        let logoutTextSpan = logoutMenuItem.link.addContent(new TextSpanView());
        logoutTextSpan.setText('Logout');
        let logoutLink = new Link(logoutMenuItem.link);
        logoutLink.setHref(this.getLogutUrl());
        let relFill = grid.addContent(new Block());
        relFill.positionRelative();
        this.content = relFill.addContent(new Block());
        this.content.setName('PageFrame_Content');
        this.content.positionAbsoluteFill();
        let documentTitle = pageContext.AppTitle;
        if (pageContext.PageTitle) {
            documentTitle = `${documentTitle} - ${pageContext.PageTitle}`;
        }
        document.title = documentTitle;
        window.addEventListener('popstate', () => {
            logoutLink.setHref(this.getLogutUrl());
        });
    }

    private getLogutUrl() {
        let returnUrl = location.href;
        if (returnUrl.indexOf('#') > -1) {
            if (returnUrl.indexOf('?') > -1) {
                returnUrl.replace('#', '&');
            }
            else {
                returnUrl.replace('#', '?');
            }
        }
        return XtiUrl.current()
            .homeUrl()
            .addPart('User')
            .addPart('Logout')
            .addQuery('cacheBust', pageContext.CacheBust)
            .addQuery('ReturnUrl', encodeURIComponent(returnUrl));
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
        new PageLoader().loadPage(this.view);
    }
}