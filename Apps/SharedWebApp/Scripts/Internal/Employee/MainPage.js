"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var xtistart_1 = require("xtistart");
var AppApiAction_1 = require("../../Shared/AppApiAction");
var AppApiEvents_1 = require("../../Shared/AppApiEvents");
var AppResourceUrl_1 = require("../../Shared/AppResourceUrl");
var AsyncCommand_1 = require("../../Shared/Command/AsyncCommand");
var ConsoleLog_1 = require("../../Shared/ConsoleLog");
var MessageAlert_1 = require("../../Shared/MessageAlert");
var AddEmployeeForm_1 = require("./AddEmployeeForm");
var MainPageView_1 = require("./MainPageView");
var MainPage = /** @class */ (function () {
    function MainPage(page) {
        this.view = new MainPageView_1.MainPageView(page);
        this.alert = new MessageAlert_1.MessageAlert(this.view.alert);
        this.addEmployeeForm = new AddEmployeeForm_1.AddEmployeeForm(this.view.addEmployeeForm);
        this.saveCommand = new AsyncCommand_1.AsyncCommand(this.save.bind(this));
        this.saveCommand.add(this.view.saveButton);
        this.saveCommand.add(this.view.submitButton);
        this.test();
    }
    MainPage.prototype.test = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var action, result;
            return (0, tslib_1.__generator)(this, function (_a) {
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
        return this.alert.infoAction('Saving...', function () { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
            var action, result;
            return (0, tslib_1.__generator)(this, function (_a) {
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