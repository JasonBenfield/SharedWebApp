"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var MainPageViewModel_1 = require("./MainPageViewModel");
var xtistart_1 = require("xtistart");
var tsyringe_1 = require("tsyringe");
var AddEmployeeForm_1 = require("./AddEmployeeForm");
var Command_1 = require("../../Shared/Command");
var AppApiAction_1 = require("../../Shared/AppApiAction");
var AppApiEvents_1 = require("../../Shared/AppApiEvents");
var AppResourceUrl_1 = require("../../Shared/AppResourceUrl");
var Alert_1 = require("../../Shared/Alert");
var ColumnCss_1 = require("../../Shared/ColumnCss");
var MainPage = /** @class */ (function () {
    function MainPage(vm) {
        this.vm = vm;
        this.alert = new Alert_1.Alert(this.vm.alert);
        this.addEmployeeForm = new AddEmployeeForm_1.AddEmployeeForm(this.vm.addEmployeeForm);
        this.saveCommand = new Command_1.AsyncCommand(this.vm.saveCommand, this.save.bind(this));
        this.addEmployeeForm.Name.setColumns(new ColumnCss_1.ColumnCss(4), new ColumnCss_1.ColumnCss());
        this.addEmployeeForm.BirthDate.setColumns(new ColumnCss_1.ColumnCss(4), new ColumnCss_1.ColumnCss());
        this.addEmployeeForm.Department.setColumns(new ColumnCss_1.ColumnCss(4), new ColumnCss_1.ColumnCss());
        this.addEmployeeForm.Address.setColumns(new ColumnCss_1.ColumnCss(4), new ColumnCss_1.ColumnCss());
        this.saveCommand.setText('Save');
        this.saveCommand.makeLight();
    }
    MainPage.prototype.save = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alert.infoAction('Saving...', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MainPage = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [MainPageViewModel_1.MainPageViewModel])
    ], MainPage);
    return MainPage;
}());
xtistart_1.startup(MainPageViewModel_1.MainPageViewModel, MainPage);
//# sourceMappingURL=MainPage.js.map