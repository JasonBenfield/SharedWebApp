"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalConfirmComponent = void 0;
var tslib_1 = require("tslib");
var Awaitable_1 = require("../Awaitable");
var Command_1 = require("../Command/Command");
var Result_1 = require("../Result");
var ModalConfirmComponent = /** @class */ (function () {
    function ModalConfirmComponent(view) {
        this.view = view;
        this.awaitable = new Awaitable_1.Awaitable();
        this.yesCommand = new Command_1.Command(this.yes.bind(this));
        this.noCommand = new Command_1.Command(this.no.bind(this));
        this.noCommand.add(this.view.noButton);
        this.yesCommand.add(this.view.yesButton);
        this.view.closed.register(this.onClosed.bind(this));
    }
    ModalConfirmComponent.prototype.onClosed = function () {
        if (this.awaitable.isInProgress()) {
            this.awaitable.resolve(new Result_1.Result('confirm', false));
        }
    };
    ModalConfirmComponent.prototype.confirm = function (message, title) {
        if (title === void 0) { title = ''; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.view.setMessage(message);
                        if (title) {
                            this.view.showTitle();
                        }
                        else {
                            this.view.hideTitle();
                        }
                        this.view.setTitle(title);
                        this.view.showModal();
                        return [4 /*yield*/, this.awaitable.start()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ModalConfirmComponent.prototype.yes = function () {
        this.awaitable.resolve(new Result_1.Result('confirm', true));
        this.view.hideModal();
    };
    ModalConfirmComponent.prototype.no = function () {
        this.awaitable.resolve(new Result_1.Result('confirm', false));
        this.view.hideModal();
    };
    return ModalConfirmComponent;
}());
exports.ModalConfirmComponent = ModalConfirmComponent;
//# sourceMappingURL=ModalConfirmComponent.js.map