"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainPageView = void 0;
var ButtonCommandItem_1 = require("../../Shared/Command/ButtonCommandItem");
var ContextualClass_1 = require("../../Shared/ContextualClass");
var Container_1 = require("../../Shared/Html/Container");
var FlexColumn_1 = require("../../Shared/Html/FlexColumn");
var FlexColumnFill_1 = require("../../Shared/Html/FlexColumnFill");
var TextHeading1View_1 = require("../../Shared/Html/TextHeading1View");
var Toolbar_1 = require("../../Shared/Html/Toolbar");
var PaddingCss_1 = require("../../Shared/PaddingCss");
var TestCardView_1 = require("./TestCardView");
var MainPageView = /** @class */ (function () {
    function MainPageView(page) {
        this.page = page;
        var flexColumn = this.page.addContent(new FlexColumn_1.FlexColumn());
        this.heading = flexColumn
            .addContent(new Container_1.Container())
            .addContent(new TextHeading1View_1.TextHeading1View());
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