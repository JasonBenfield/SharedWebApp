"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalConfirmComponent = exports.ModalConfirmComponentResult = void 0;
var tslib_1 = require("tslib");
var Awaitable_1 = require("../Awaitable");
var Command_1 = require("../Command/Command");
var TextBlock_1 = require("../Html/TextBlock");
var ModalConfirmComponentResult = /** @class */ (function () {
    function ModalConfirmComponentResult(results) {
        this.results = results;
    }
    Object.defineProperty(ModalConfirmComponentResult, "confirmed", {
        get: function () { return new ModalConfirmComponentResult({ confirmed: {} }); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModalConfirmComponentResult, "rejected", {
        get: function () { return new ModalConfirmComponentResult({ rejected: {} }); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModalConfirmComponentResult.prototype, "confirmed", {
        get: function () { return this.results.confirmed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModalConfirmComponentResult.prototype, "rejected", {
        get: function () { return this.results.rejected; },
        enumerable: false,
        configurable: true
    });
    return ModalConfirmComponentResult;
}());
exports.ModalConfirmComponentResult = ModalConfirmComponentResult;
var ModalConfirmComponent = /** @class */ (function () {
    function ModalConfirmComponent(view) {
        this.view = view;
        this.awaitable = new Awaitable_1.Awaitable();
        this.yesCommand = new Command_1.Command(this.yes.bind(this));
        this.noCommand = new Command_1.Command(this.no.bind(this));
        this.message = new TextBlock_1.TextBlock('', this.view.message);
        this.title = new TextBlock_1.TextBlock('', this.view.title);
        this.noCommand.add(this.view.noButton);
        this.yesCommand.add(this.view.yesButton);
        this.view.closed.register(this.onClosed.bind(this));
    }
    ModalConfirmComponent.prototype.onClosed = function () {
        if (this.awaitable.isInProgress()) {
            this.awaitable.resolve(ModalConfirmComponentResult.rejected);
        }
    };
    ModalConfirmComponent.prototype.confirm = function (message, title) {
        if (title === void 0) { title = ''; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.message.setText(message);
                        if (title) {
                            this.view.showTitle();
                        }
                        else {
                            this.view.hideTitle();
                        }
                        this.title.setText(title);
                        this.view.showModal();
                        return [4 /*yield*/, this.awaitable.start()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, Boolean(result.confirmed)];
                }
            });
        });
    };
    ModalConfirmComponent.prototype.yes = function () {
        this.awaitable.resolve(ModalConfirmComponentResult.confirmed);
        this.view.hideModal();
    };
    ModalConfirmComponent.prototype.no = function () {
        this.awaitable.resolve(ModalConfirmComponentResult.rejected);
        this.view.hideModal();
    };
    return ModalConfirmComponent;
}());
exports.ModalConfirmComponent = ModalConfirmComponent;
//# sourceMappingURL=ModalConfirmComponent.js.map