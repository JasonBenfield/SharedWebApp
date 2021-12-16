"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAlert = void 0;
var tslib_1 = require("tslib");
var _ = require("lodash");
var ContextualClass_1 = require("./ContextualClass");
var Events_1 = require("./Events");
var MessageAlert = /** @class */ (function () {
    function MessageAlert(view) {
        var _this = this;
        this.view = view;
        this._messageChanged = new Events_1.DefaultEvent(this);
        this.messageChanged = this._messageChanged.handler();
        this.debouncedSetMessage = _.debounce(function (message) {
            _this.updateVmMessage(message);
        }, 500);
    }
    Object.defineProperty(MessageAlert.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MessageAlert.prototype, "hasMessage", {
        get: function () {
            return Boolean(this._message);
        },
        enumerable: false,
        configurable: true
    });
    MessageAlert.prototype.clear = function () {
        this.setMessage('');
    };
    MessageAlert.prototype.success = function (message) {
        this.view.setContext(ContextualClass_1.ContextualClass.success);
        this.setMessage(message);
    };
    MessageAlert.prototype.info = function (message) {
        this.view.setContext(ContextualClass_1.ContextualClass.info);
        this.setMessage(message);
    };
    MessageAlert.prototype.infoAction = function (message, a) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.info(message);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, a()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.clear();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MessageAlert.prototype.warning = function (message) {
        this.view.setContext(ContextualClass_1.ContextualClass.warning);
        this.setMessage(message);
    };
    MessageAlert.prototype.danger = function (message) {
        this.view.setContext(ContextualClass_1.ContextualClass.danger);
        this.setMessage(message);
    };
    MessageAlert.prototype.setMessage = function (message) {
        this._message = _.trim(message);
        this._messageChanged.invoke(this._message);
        if (this._message) {
            this.updateVmMessage(this._message);
        }
        this.debouncedSetMessage(this._message);
    };
    MessageAlert.prototype.updateVmMessage = function (message) {
        this.view.setMessage(message);
        if (message) {
            this.view.show();
        }
        else {
            this.view.hide();
        }
    };
    return MessageAlert;
}());
exports.MessageAlert = MessageAlert;
//# sourceMappingURL=MessageAlert.js.map