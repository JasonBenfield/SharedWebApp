"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageFrameView = void 0;
var AlignCss_1 = require("./AlignCss");
var ContextualClass_1 = require("./ContextualClass");
var DropdownBlock_1 = require("./Dropdown/DropdownBlock");
var ModalErrorComponentView_1 = require("./Error/ModalErrorComponentView");
var FaIcon_1 = require("./FaIcon");
var AggregateComponent_1 = require("./Html/AggregateComponent");
var Block_1 = require("./Html/Block");
var FlexColumn_1 = require("./Html/FlexColumn");
var Heading1_1 = require("./Html/Heading1");
var TextSmall_1 = require("./Html/TextSmall");
var TextSpan_1 = require("./Html/TextSpan");
var Toolbar_1 = require("./Html/Toolbar");
var PaddingCss_1 = require("./PaddingCss");
var PageLoader_1 = require("./PageLoader");
var PageViewModel_1 = require("./PageViewModel");
var TextCss_1 = require("./TextCss");
var PageFrameView = /** @class */ (function () {
    function PageFrameView(vm) {
        if (vm === void 0) { vm = new PageViewModel_1.PageViewModel(); }
        this.vm = vm;
        this.outerContent = new AggregateComponent_1.AggregateComponent(this.vm.content);
        this.modalError = new ModalErrorComponentView_1.ModalErrorComponentView(this.vm.modalError);
        var frame = this.outerContent.addContent(new FlexColumn_1.FlexColumn());
        frame.setName('PageFrame');
        frame.flexFill();
        this.toolbar = frame.addContent(new Toolbar_1.Toolbar());
        this.toolbar.setName('PageFrame_MainToolbar');
        this.toolbar.setBackgroundContext(ContextualClass_1.ContextualClass.primary);
        this.toolbar.setPadding(PaddingCss_1.PaddingCss.xs(3));
        this.toolbar.columnStart.setTextCss(new TextCss_1.TextCss().context(ContextualClass_1.ContextualClass.light));
        var heading = this.toolbar.columnStart.addContent(new Heading1_1.Heading1());
        this.appTitle = heading.addContent(new TextSpan_1.TextSpan(pageContext.AppTitle));
        this.pageTitle = heading.addContent(new TextSmall_1.TextSmall(pageContext.PageTitle));
        this.toolbar.columnEnd.addCssFrom(new AlignCss_1.AlignCss().self(function (a) { return a.xs('center'); }).cssClass());
        var dropdown = this.toolbar.columnEnd.addContent(new DropdownBlock_1.DropdownBlock());
        if (!pageContext.IsAuthenticated) {
            dropdown.hide();
        }
        dropdown.button.setContext(ContextualClass_1.ContextualClass.light);
        dropdown.button.useOutlineStyle();
        dropdown.button.addContent(new FaIcon_1.FaIcon('user'));
        dropdown
            .addSpanItem()
            .span
            .addContent(new TextSpan_1.TextSpan(pageContext.UserName));
        this.logoutMenuItem = dropdown.addLinkItem();
        this.logoutMenuItem.link.addContent(new TextSpan_1.TextSpan('Logout'));
        this.logoutMenuItem.link.setHref(pageContext.BaseUrl + "/Hub/Current/Auth/Logout");
        this.content = frame.addContent(new Block_1.Block());
        this.content.flexFill();
        this.content.addCssName('h-100');
        this.content.setName('PageFrame_Content');
        var documentTitle = pageContext.AppTitle;
        if (pageContext.PageTitle) {
            documentTitle = documentTitle + " - " + pageContext.PageTitle;
        }
        document.title = documentTitle;
    }
    PageFrameView.prototype.setName = function (name) {
        this.outerContent.setName(name);
    };
    PageFrameView.prototype.addItem = function (itemVM, item) {
        return this.content.addItem(itemVM, item);
    };
    PageFrameView.prototype.insertItem = function (index, itemVM, item) {
        return this.content.insertItem(index, itemVM, item);
    };
    PageFrameView.prototype.removeItem = function (item) {
        return this.content.removeItem(item);
    };
    PageFrameView.prototype.show = function () {
        this.content.show();
    };
    PageFrameView.prototype.hide = function () {
        this.content.hide();
    };
    PageFrameView.prototype.insertContent = function (index, item) {
        return item.insertIntoContainer(this.content, index);
    };
    PageFrameView.prototype.addContent = function (item) {
        return item.addToContainer(this.content);
    };
    PageFrameView.prototype.load = function () {
        new PageLoader_1.PageLoader().loadPage(this.vm);
    };
    return PageFrameView;
}());
exports.PageFrameView = PageFrameView;
//# sourceMappingURL=PageFrameView.js.map