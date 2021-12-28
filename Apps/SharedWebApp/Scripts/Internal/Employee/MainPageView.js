"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainPageView = void 0;
var ColumnCss_1 = require("../../Shared/ColumnCss");
var ButtonCommandItem_1 = require("../../Shared/Command/ButtonCommandItem");
var ContextualClass_1 = require("../../Shared/ContextualClass");
var Block_1 = require("../../Shared/Html/Block");
var Container_1 = require("../../Shared/Html/Container");
var FlexColumn_1 = require("../../Shared/Html/FlexColumn");
var FlexColumnFill_1 = require("../../Shared/Html/FlexColumnFill");
var TextHeading1View_1 = require("../../Shared/Html/TextHeading1View");
var Toolbar_1 = require("../../Shared/Html/Toolbar");
var MessageAlertView_1 = require("../../Shared/MessageAlertView");
var PaddingCss_1 = require("../../Shared/PaddingCss");
var AddEmployeeFormView_1 = require("./AddEmployeeFormView");
var AddressInputLayout_1 = require("./AddressInputLayout");
var MainPageView = /** @class */ (function () {
    function MainPageView(page) {
        this.page = page;
        var flexColumn = this.page.addContent(new FlexColumn_1.FlexColumn());
        var headerRow = flexColumn.addContent(new Block_1.Block());
        headerRow.addContent(new Container_1.Container());
        this.heading = headerRow.addContent(new TextHeading1View_1.TextHeading1View());
        var flexFill = flexColumn.addContent(new FlexColumnFill_1.FlexColumnFill());
        this.alert = flexFill.addContent(new MessageAlertView_1.MessageAlertView());
        this.addEmployeeForm = flexFill.container.addContent(new AddEmployeeFormView_1.AddEmployeeFormView());
        var toolbar = flexColumn.addContent(new Toolbar_1.Toolbar());
        toolbar.setPadding(PaddingCss_1.PaddingCss.xs(3));
        toolbar.setBackgroundContext(ContextualClass_1.ContextualClass.secondary);
        this.saveButton = toolbar.columnEnd.addContent(new ButtonCommandItem_1.ButtonCommandItem());
        this.saveButton.icon.solidStyle();
        this.saveButton.icon.setName('check');
        this.saveButton.setText('Save');
        this.saveButton.setContext(ContextualClass_1.ContextualClass.light);
        this.submitButton = this.addEmployeeForm.addOffscreenSubmit();
        this.addEmployeeForm.forEachFormGroup(function (fg) {
            fg.captionColumn.setColumnCss(ColumnCss_1.ColumnCss.xs(4));
        });
        this.addEmployeeForm.Address.useLayout(function (fg) { return new AddressInputLayout_1.AddressInputLayout(fg); });
        //this.addEmployeeForm.submitted.register(this.onFormSubmit.bind(this));
        this.addEmployeeForm.executeLayout();
    }
    return MainPageView;
}());
exports.MainPageView = MainPageView;
//# sourceMappingURL=MainPageView.js.map