"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AsyncCommand_1 = require("../../Shared/Command/AsyncCommand");
var AppApiAction_1 = require("../../Shared/AppApiAction");
var AppApiEvents_1 = require("../../Shared/AppApiEvents");
var AppResourceUrl_1 = require("../../Shared/AppResourceUrl");
var ColumnCss_1 = require("../../Shared/ColumnCss");
var ContextualClass_1 = require("../../Shared/ContextualClass");
var MessageAlert_1 = require("../../Shared/MessageAlert");
var AddEmployeeForm_1 = require("./AddEmployeeForm");
var FlexColumn_1 = require("../../Shared/Html/FlexColumn");
var Block_1 = require("../../Shared/Html/Block");
var Container_1 = require("../../Shared/Html/Container");
var TextHeading1_1 = require("../../Shared/Html/TextHeading1");
var FlexColumnFill_1 = require("../../Shared/Html/FlexColumnFill");
var Toolbar_1 = require("../../Shared/Html/Toolbar");
var ButtonCommandItem_1 = require("../../Shared/Command/ButtonCommandItem");
var PaddingCss_1 = require("../../Shared/PaddingCss");
var AddressInputLayout_1 = require("./AddressInputLayout");
var ConsoleLog_1 = require("../../Shared/ConsoleLog");
var xtistart_1 = require("xtistart");
var MainPage = /** @class */ (function () {
    function MainPage(page) {
        this.page = page;
        var flexColumn = this.page.addContent(new FlexColumn_1.FlexColumn());
        var headerRow = flexColumn.addContent(new Block_1.Block());
        headerRow.addContent(new Container_1.Container());
        headerRow.addContent(new TextHeading1_1.TextHeading1('Add Employee'));
        var flexFill = flexColumn.addContent(new FlexColumnFill_1.FlexColumnFill());
        this.alert = flexFill.addContent(new MessageAlert_1.MessageAlert());
        this.addEmployeeForm = flexFill.container.addContent(new AddEmployeeForm_1.AddEmployeeForm());
        var toolbar = flexColumn.addContent(new Toolbar_1.Toolbar());
        toolbar.setPadding(PaddingCss_1.PaddingCss.xs(3));
        toolbar.setBackgroundContext(ContextualClass_1.ContextualClass.secondary);
        var saveCommandItem = toolbar.columnEnd.addContent(new ButtonCommandItem_1.ButtonCommandItem());
        saveCommandItem.icon.solidStyle();
        saveCommandItem.icon.setName('check');
        saveCommandItem.setText('Save');
        saveCommandItem.setContext(ContextualClass_1.ContextualClass.light);
        this.saveCommand = new AsyncCommand_1.AsyncCommand(this.save.bind(this));
        this.saveCommand.add(saveCommandItem);
        this.saveCommand.add(this.addEmployeeForm.addOffscreenSubmit());
        this.addEmployeeForm.forEachFormGroup(function (fg) {
            fg.captionColumn.setColumnCss(ColumnCss_1.ColumnCss.xs(4));
        });
        this.test();
        this.addEmployeeForm.Address.useLayout(function (fg) { return new AddressInputLayout_1.AddressInputLayout(fg); });
        //this.addEmployeeForm.submitted.register(this.onFormSubmit.bind(this));
        this.addEmployeeForm.executeLayout();
    }
    MainPage.prototype.onFormSubmit = function () {
        this.saveCommand.execute();
    };
    MainPage.prototype.test = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var action, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = new AppApiAction_1.AppApiAction(new AppApiEvents_1.AppApiEvents(function () { }), AppResourceUrl_1.AppResourceUrl.app(location.protocol + "//" + location.host, 'Shared', 'Current', '', '')
                            .withGroup('Employee'), 'Test', 'Test');
                        return [4 /*yield*/, action.execute(5, {})];
                    case 1:
                        result = _a.sent();
                        new ConsoleLog_1.ConsoleLog().info(result.toString());
                        return [2 /*return*/];
                }
            });
        });
    };
    MainPage.prototype.save = function () {
        var _this = this;
        return this.alert.infoAction('Saving...', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var action, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = new AppApiAction_1.AppApiAction(new AppApiEvents_1.AppApiEvents(function () { }), AppResourceUrl_1.AppResourceUrl.app(location.protocol + "//" + location.host, 'Shared', 'Current', '', '').withGroup('Employee'), 'AddEmployee', 'Add Employee');
                        return [4 /*yield*/, this.addEmployeeForm.save(action)];
                    case 1:
                        result = _a.sent();
                        if (result.succeeded()) {
                            alert("Success: " + result.value);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return MainPage;
}());
new MainPage(new xtistart_1.Startup().build());
//# sourceMappingURL=MainPage.js.map