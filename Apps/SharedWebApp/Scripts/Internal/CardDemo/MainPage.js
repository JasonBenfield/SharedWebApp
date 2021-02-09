"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestCard_1 = require("./TestCard");
var FlexColumn_1 = require("../../Shared/Html/FlexColumn");
var FlexColumnFill_1 = require("../../Shared/Html/FlexColumnFill");
var Container_1 = require("../../Shared/Html/Container");
var Toolbar_1 = require("../../Shared/Html/Toolbar");
var Block_1 = require("../../Shared/Html/Block");
var Heading1_1 = require("../../Shared/Html/Heading1");
var TextSpan_1 = require("../../Shared/Html/TextSpan");
var ButtonCommandItem_1 = require("../../Shared/Command/ButtonCommandItem");
var ContextualClass_1 = require("../../Shared/ContextualClass");
var PaddingCss_1 = require("../../Shared/PaddingCss");
var AsyncCommand_1 = require("../../Shared/Command/AsyncCommand");
var xtistart_1 = require("xtistart");
var MainPage = /** @class */ (function () {
    function MainPage(page) {
        this.page = page;
        var flexColumn = this.page.addContent(new FlexColumn_1.FlexColumn());
        flexColumn.addContent(new Block_1.Block())
            .configure(function (b) {
            var container = b.addContent(new Container_1.Container());
            var heading1 = container.addContent(new Heading1_1.Heading1());
            heading1.addContent(new TextSpan_1.TextSpan('Card Demo'));
        });
        var fillRow = flexColumn.addContent(new FlexColumnFill_1.FlexColumnFill());
        this.testCard = fillRow.container.addContent(new TestCard_1.TestCard());
        var toolbar = flexColumn.addContent(new Toolbar_1.Toolbar());
        toolbar.setBackgroundContext(ContextualClass_1.ContextualClass.secondary);
        toolbar.setPadding(PaddingCss_1.PaddingCss.xs(3));
        var refreshCommand = new AsyncCommand_1.AsyncCommand(this.refresh.bind(this));
        refreshCommand.animateIconWhenInProgress('spin');
        var refreshButton = refreshCommand.add(toolbar.columnStart.addContent(new ButtonCommandItem_1.ButtonCommandItem()));
        refreshButton.icon.setName('sync-alt');
        refreshButton.setText('Refresh');
        refreshButton.useOutlineStyle();
        refreshButton.setContext(ContextualClass_1.ContextualClass.light);
        var cancelButton = toolbar.columnEnd.addContent(new ButtonCommandItem_1.ButtonCommandItem());
        cancelButton.icon.setName('times');
        cancelButton.setText('Cancel');
        cancelButton.setContext(ContextualClass_1.ContextualClass.danger);
        var saveButton = toolbar.columnEnd.addContent(new ButtonCommandItem_1.ButtonCommandItem());
        saveButton.icon.setName('check');
        saveButton.setText('Save');
        saveButton.useOutlineStyle();
        saveButton.setBackgroundContext(ContextualClass_1.ContextualClass.light);
        saveButton.setContext(ContextualClass_1.ContextualClass.primary);
    }
    MainPage.prototype.refresh = function () {
        return this.testCard.refresh();
    };
    return MainPage;
}());
new MainPage(new xtistart_1.Startup().build());
//# sourceMappingURL=MainPage.js.map