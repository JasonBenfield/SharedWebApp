"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAlert = void 0;
var tslib_1 = require("tslib");
var _ = require("lodash");
var ContextualClass_1 = require("./ContextualClass");
var DebouncedAction_1 = require("./DebouncedAction");
var Events_1 = require("./Events");
var TextBlock_1 = require("./Html/TextBlock");
var MessageAlert = /** @class */ (function () {
    function MessageAlert(view) {
        var _this = this;
        this.view = view;
        this._isVisibleChanged = new Events_1.DefaultEvent(this);
        this.isVisibleChanged = this._isVisibleChanged.handler();
        this.debouncedSetMessage = new DebouncedAction_1.DebouncedAction(function (message) {
            _this.updateViewMessage(message);
        }, 500);
        this.textBlock = new TextBlock_1.TextBlock('', view.textBlock);
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
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.info(message);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, a()];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.clear();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/, result];
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
        if (this._message) {
            this.updateViewMessage(this._message);
        }
        this.debouncedSetMessage.execute(this._message);
    };
    MessageAlert.prototype.updateViewMessage = function (message) {
        this.textBlock.setText(message);
        if (message) {
            this.view.show();
            this._isVisibleChanged.invoke(true);
        }
        else {
            this.view.hide();
            this._isVisibleChanged.invoke(false);
        }
    };
    return MessageAlert;
}());
exports.MessageAlert = MessageAlert;
//# sourceMappingURL=MessageAlert.js.map