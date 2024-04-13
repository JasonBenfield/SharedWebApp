import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf";
import "@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2";
import "@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf";
import "@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2";
import "@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf";
import "@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2";
import "@fortawesome/fontawesome-free/webfonts/fa-v4compatibility.ttf";
import "@fortawesome/fontawesome-free/webfonts/fa-v4compatibility.woff2";
import { AlignCss } from "../AlignCss";
import { BorderCss } from "../BorderCss";
import { ColumnCss } from "../ColumnCss";
import { ContextualClass } from "../ContextualClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { PaddingCss } from "../PaddingCss";
import { Position, PositionUnit } from "../Position";
import '../Styles/default.scss';
import { TextCss } from "../TextCss";
import { BasicComponentView } from "./BasicComponentView";
import { BlockView } from "./BlockView";
import { DropdownComponentView } from "./Dropdown";
import { FaIconView } from "./FaIconView";
import { GridCellView, GridView } from "./Grid";
import { ModalErrorView } from "./ModalError";
import { RootView } from "./RootView";
import { RowView } from "./RowView";
import { TextBlockView } from "./TextBlockView";
import { TextHeading1View } from "./TextHeadings";
import { ViewConstructor } from "./Types";
import { UserMenuView } from "./UserMenuView";

export class BasicPageView {
    readonly topBanner: BlockView;
    readonly appTitle: TextHeading1View;
    readonly pageTitle: TextBlockView;
    private readonly environmentBox: BlockView;
    readonly environmentName: TextBlockView;
    private readonly userDropdown: DropdownComponentView;
    readonly content: BlockView;
    readonly modalError: ModalErrorView;
    readonly userMenu: UserMenuView;

    constructor() {
        const rootView = new RootView();
        const grid = rootView.addView(GridView);
        grid.styleAsLayout();
        grid.addCssName('h-100');
        grid.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1));
        this.topBanner = grid.addCell(GridCellView)
            .configure(b => {
                b.setBackgroundContext(ContextualClass.primary);
                b.setPadding(PaddingCss.xs(3));
                b.setTextCss(new TextCss().context(ContextualClass.light));
            })
            .addView(BlockView);
        this.environmentBox = this.topBanner.addView(BlockView);
        this.environmentBox.setBorderCss(
            new BorderCss()
                .all(b => b.context(ContextualClass.warning))
                .rounded()
        );
        this.environmentBox.positionAbsolute(
            new Position({
                left: PositionUnit.px(10),
                top: PositionUnit.px(10)
            })
        );
        this.environmentBox.setPadding(PaddingCss.xs(1));
        this.environmentBox.setBackgroundContext(ContextualClass.light);
        this.environmentBox.addCssName('bg-opacity-25');
        this.environmentName = this.environmentBox.addView(TextBlockView)
            .configure(tb => {
                tb.setTextCss(new TextCss().context(ContextualClass.warning).bold());
            });
        this.topBanner.addCssName('container');
        const row = this.topBanner.addView(RowView);
        const col1 = row.addColumn();
        col1.setColumnCss(ColumnCss.xs('auto'));
        this.appTitle = col1.addView(TextHeading1View);
        const col2 = row.addColumn();
        col2.setTextCss(new TextCss().truncate());
        col2.addCssFrom(new AlignCss().self(a => a.xs('center')));
        this.pageTitle = col2.addView(TextBlockView);
        const col3 = row.addColumn();
        col3.setColumnCss(ColumnCss.xs('auto'));
        col3.addCssFrom(new AlignCss().self(a => a.xs('center')));

        this.userDropdown = col3.addView(DropdownComponentView);
        this.userDropdown.button.useOutlineStyle(ContextualClass.light);
        this.userDropdown.button.addView(FaIconView)
            .configure(i => i.solidStyle('user'));
        this.userMenu = this.userDropdown.menuContainer.addView(UserMenuView);
        const relFill = grid.addCell();
        relFill.addCssName('position-relative');
        this.content = relFill.addView(BlockView);
        this.content.positionAbsoluteFill();
        this.modalError = this.addView(ModalErrorView);
    }

    hideEnvironmentBox() {
        this.environmentBox.hide();
    }

    hideUserDropdown() {
        this.userDropdown.hide();
    }

    setDocumentTitle(title: string) {
        document.title = title;
    }

    addView<T extends BasicComponentView>(ctor: ViewConstructor<T>) {
        return this.content.addView(ctor);
    }
}