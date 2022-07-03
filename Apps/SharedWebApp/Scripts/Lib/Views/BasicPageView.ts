import { AlignCss } from "../AlignCss";
import { ColumnCss } from "../ColumnCss";
import { ContextualClass } from "../ContextualClass";
import { EventSource } from '../Events';
import { CssLengthUnit } from "../CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { PaddingCss } from "../PaddingCss";
import { TextCss } from "../TextCss";
import { BasicComponentView } from "./BasicComponentView";
import { BlockView } from "./BlockView";
import { DropdownComponentView } from "./Dropdown";
import { FaIconView } from "./FaIconView";
import { GridCellView, GridView } from "./Grid";
import { LinkView } from "./LinkView";
import { ModalErrorView } from "./ModalError";
import { RootView } from "./RootView";
import { RowView } from "./RowView";
import { TextBlockView } from "./TextBlockView";
import { TextHeading1View } from "./TextHeadings";
import { TextSpanView } from "./TextSpanView";
import { ViewConstructor } from "./Types";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf";
import "@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2";
import "@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf";
import "@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2";
import "@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf";
import "@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2";
import "@fortawesome/fontawesome-free/webfonts/fa-v4compatibility.ttf";
import "@fortawesome/fontawesome-free/webfonts/fa-v4compatibility.woff2";
import '../Styles/default.scss';

export class BasicPageView {
    readonly toolbar: BlockView;
    readonly appTitle: TextHeading1View;
    readonly pageTitle: TextBlockView;
    readonly content: BlockView;
    readonly modalError: ModalErrorView;
    readonly userDropdown: DropdownComponentView;
    readonly homeLink: LinkView;
    readonly logOutLink: LinkView;
    private readonly events = { urlChanged: null };
    private readonly eventSource = new EventSource(this, this.events);
    readonly when = this.eventSource.when;

    constructor() {
        const rootView = new RootView();
        const grid = rootView.addView(GridView);
        grid.layout();
        grid.addCssName('h-100');
        grid.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1));
        grid.setViewName('PageFrame');
        this.toolbar = grid.addCell(GridCellView)
            .configure(b => {
                b.setBackgroundContext(ContextualClass.primary);
                b.setPadding(PaddingCss.xs(3));
                b.setTextCss(new TextCss().context(ContextualClass.light));
            })
            .addView(BlockView);
        this.toolbar.addCssName('container');
        const row = this.toolbar.addView(RowView);
        const col1 = row.addColumn();
        col1.setColumnCss(ColumnCss.xs('auto'));
        this.appTitle = col1.addView(TextHeading1View);
        this.appTitle.setText(pageContext.AppTitle);
        const col2 = row.addColumn();
        col2.setTextCss(new TextCss().truncate());
        col2.addCssFrom(new AlignCss().self(a => a.xs('center')));
        this.pageTitle = col2.addView(TextBlockView);
        this.pageTitle.setText(pageContext.PageTitle);
        const col3 = row.addColumn();
        col3.setColumnCss(ColumnCss.xs('auto'));
        col3.addCssFrom(new AlignCss().self(a => a.xs('center')));
        this.userDropdown = col3.addView(DropdownComponentView);
        if (!pageContext.IsAuthenticated) {
            this.userDropdown.hide();
        }
        this.userDropdown.button.useOutlineStyle(ContextualClass.light);
        this.userDropdown.button.addView(FaIconView)
            .configure(i => i.solidStyle('user'));
        const userName = this.userDropdown.menu
            .addSpanItem()
            .span.addView(TextSpanView);
        userName.setText(pageContext.UserName);
        this.homeLink = this.userDropdown.menu.addLinkItem().link;
        this.homeLink.addView(FaIconView)
            .configure(i => {
                i.solidStyle('house');
                i.setMargin(MarginCss.end(1));
            });
        const homeTextSpan = this.homeLink.addView(TextSpanView);
        homeTextSpan.setText('Home');
        this.logOutLink = this.userDropdown.menu.addLinkItem().link;
        this.logOutLink.addView(FaIconView)
            .configure(i => {
                i.solidStyle('right-from-bracket');
                i.setMargin(MarginCss.end(1));
            });
        const logoutTextSpan = this.logOutLink.addView(TextSpanView);
        logoutTextSpan.setText('Logout');
        const relFill = grid.addCell();
        relFill.addCssName('position-relative');
        this.content = relFill.addView(BlockView);
        this.content.setViewName('PageFrame_Content');
        this.content.positionAbsoluteFill();
        let documentTitle = pageContext.AppTitle;
        if (pageContext.PageTitle) {
            documentTitle = `${documentTitle} - ${pageContext.PageTitle}`;
        }
        document.title = documentTitle;
        window.addEventListener('popstate', () => this.eventSource.events.urlChanged.invoke());
        this.modalError = this.addView(ModalErrorView);
    }

    addView<T extends BasicComponentView>(ctor: ViewConstructor<T>) {
        return this.content.addView(ctor);
    }
}