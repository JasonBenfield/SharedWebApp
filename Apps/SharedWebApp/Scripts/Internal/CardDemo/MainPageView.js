"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainPageView = void 0;
var ButtonCommandItem_1 = require("../../Shared/Command/ButtonCommandItem");
var ContextualClass_1 = require("../../Shared/ContextualClass");
var Block_1 = require("../../Shared/Html/Block");
var Container_1 = require("../../Shared/Html/Container");
var FlexColumn_1 = require("../../Shared/Html/FlexColumn");
var FlexColumnFill_1 = require("../../Shared/Html/FlexColumnFill");
var Heading1_1 = require("../../Shared/Html/Heading1");
var TextSpan_1 = require("../../Shared/Html/TextSpan");
var Toolbar_1 = require("../../Shared/Html/Toolbar");
var PaddingCss_1 = require("../../Shared/PaddingCss");
var TestCardView_1 = require("./TestCardView");
var MainPageView = /** @class */ (function () {
    function MainPageView(page) {
        this.page = page;
        var flexColumn = this.page.addContent(new FlexColumn_1.FlexColumn());
        flexColumn.addContent(new Block_1.Block())
            .configure(function (b) {
            var container = b.addContent(new Container_1.Container());
            var heading1 = container.addContent(new Heading1_1.Heading1());
            heading1.addContent(new TextSpan_1.TextSpan('Card Demo'));
        });
        var fillRow = flexColumn.addContent(new FlexColumnFill_1.FlexColumnFill());
        this.testCard = fillRow.container.addContent(new TestCardView_1.TestCardView());
        var toolbar = flexColumn.addContent(new Toolbar_1.Toolbar());
        toolbar.setBackgroundContext(ContextualClass_1.ContextualClass.secondary);
        toolbar.setPadding(PaddingCss_1.PaddingCss.xs(3));
        this.refreshButton = toolbar.columnStart.addContent(new ButtonCommandItem_1.ButtonCommandItem());
        this.refreshButton.icon.setName('sync-alt');
        this.refreshButton.setText('Refresh');
        this.refreshButton.useOutlineStyle();
        this.refreshButton.setContext(ContextualClass_1.ContextualClass.light);
        this.cancelButton = toolbar.columnEnd.addContent(new ButtonCommandItem_1.ButtonCommandItem());
        this.cancelButton.icon.setName('times');
        this.cancelButton.setText('Cancel');
        this.cancelButton.setContext(ContextualClass_1.ContextualClass.danger);
        this.saveButton = toolbar.columnEnd.addContent(new ButtonCommandItem_1.ButtonCommandItem());
        this.saveButton.icon.setName('check');
        this.saveButton.setText('Save');
        this.saveButton.useOutlineStyle();
        this.saveButton.setBackgroundContext(ContextualClass_1.ContextualClass.light);
        this.saveButton.setContext(ContextualClass_1.ContextualClass.primary);
    }
    return MainPageView;
}());
exports.MainPageView = MainPageView;
//# sourceMappingURL=MainPageView.js.map