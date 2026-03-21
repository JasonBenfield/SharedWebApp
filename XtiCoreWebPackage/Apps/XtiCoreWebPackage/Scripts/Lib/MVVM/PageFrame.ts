import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2";
import "@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2";
import "@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2";
import "@fortawesome/fontawesome-free/webfonts/fa-v4compatibility.woff2";
import { AlignCss } from "../Bootstrap/AlignCss";
import { BackgroundCss } from "../Bootstrap/BackgroundCss";
import { ContainerCss } from "../Bootstrap/ContainerCss";
import { ContextualClass } from "../Bootstrap/ContextualClass";
import { DisplayCss } from "../Bootstrap/DisplayCss";
import { FlexCss } from "../Bootstrap/FlexCss";
import { HeightCss } from "../Bootstrap/HeightCss";
import { MarginCss } from "../Bootstrap/MarginCss";
import { PaddingCss } from "../Bootstrap/PaddingCss";
import { PositionCss } from "../Bootstrap/PositionCss";
import { TextCss } from "../Bootstrap/TextCss";
import "../Styles/default.scss";
import { ComponentView } from "./ComponentView";
import { CompositeComponentView } from "./CompositeComponent";
import { ContainerComponentView } from "./ContainerComponentView";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { TextComponentView } from "./TextComponent";

export class PageFrameBannerView extends StyleableComponentViewMixin(ComponentView) {
    constructor() {
        super();
        this.addLayout(this.layout);
        this.setCss(BackgroundCss.gradient(ContextualClass.primary));
        this.layout.container.setCss(new ContainerCss());
        this.layout.container.setCss(DisplayCss.flex());
        this.layout.container.setCss(new FlexCss().row());
        this.appTitle.setText("App Title");
        this.appTitle.setCss(MarginCss.xs(0));
        this.appTitle.setCss(PaddingCss.xs(3));
        this.appTitle.setCss(new TextCss().context(ContextualClass.light));
        this.pageTitle.setCss(new FlexCss().grow(1));
        this.pageTitle.setText("Page Title");
        this.pageTitle.setCss(MarginCss.top(4));
        this.pageTitle.setCss(PaddingCss.xs(0));
        this.pageTitle.setCss(new TextCss().context(ContextualClass.light));
        this.pageTitle.setCss(new AlignCss().self(s => s.xs("baseline")));
        this.userContainer.user.setText("User");
    }

    private readonly layout = {
        container: CompositeComponentView.block({
            appTitle: TextComponentView.heading(1),
            pageTitle: TextComponentView.heading(3),
            userContainer: CompositeComponentView.block({
                user: new TextComponentView()
            })
        })
    };
    get appTitle() { return this.layout.container.appTitle; }
    get pageTitle() { return this.layout.container.pageTitle; }
    get userContainer() { return this.layout.container.userContainer; }
}

export class PageFrameView extends StyleableComponentViewMixin(ComponentView) {

    constructor() {
        super();
        this.setCss(DisplayCss.flex());
        this.setCss(new FlexCss().column());
        this.setCss(HeightCss.fillViewport());
        this.addLayout(this.layout);
        this.layout.outerContainer.setCss(PositionCss.relative());
        this.layout.outerContainer.setCss(new FlexCss().grow(1));
        this.contentContainer.setCss(PositionCss.absolute().top(0).bottom(0).start(0).end(0));
    }

    private readonly layout = {
        banner: new PageFrameBannerView(),
        outerContainer: CompositeComponentView.block({
            contentContainer: new ContainerComponentView()
        })
    };

    get banner() { return this.layout.banner; }

    get contentContainer() { return this.layout.outerContainer.contentContainer; }

    addContent(view: ComponentView) {
        this.contentContainer.addChildView(view);
    }
}