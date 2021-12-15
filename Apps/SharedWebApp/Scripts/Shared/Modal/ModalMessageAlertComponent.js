"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalMessageAlertComponent = void 0;
var tslib_1 = require("tslib");
var Awaitable_1 = require("../Awaitable");
var Command_1 = require("../Command/Command");
var MessageAlert_1 = require("../MessageAlert");
var Result_1 = require("../Result");
var ModalMessageAlertComponent = /** @class */ (function () {
    function ModalMessageAlertComponent(view) {
        this.view = view;
        this.awaitable = new Awaitable_1.Awaitable();
        this.okCommand = new Command_1.Command(this.ok.bind(this));
        this._alert = new MessageAlert_1.MessageAlert(this.view.alert);
        this.okCommand.add(this.view.okButton);
        this.view.closed.register(this.onClosed.bind(this));
    }
    ModalMessageAlertComponent.prototype.onClosed = function () {
        if (this.awaitable.isInProgress()) {
            this.awaitable.resolve(new Result_1.Result('ok'));
        }
    };
    ModalMessageAlertComponent.prototype.setBackdrop = function (backdrop) {
        this.view.setBackdrop(backdrop);
    };
    ModalMessageAlertComponent.prototype.alert = function (action) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action(this._alert);
                        this.view.showModal();
                        return [4 /*yield*/, this.awaitable.start()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalMessageAlertComponent.prototype.ok = function () {
        this.awaitable.resolve(new Result_1.Result('ok'));
        this.view.hideModal();
    };
    return ModalMessageAlertComponent;
}());
exports.ModalMessageAlertComponent = ModalMessageAlertComponent;
//# sourceMappingURL=ModalMessageAlertComponent.js.map