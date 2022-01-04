"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("mocha");
var chai_1 = require("chai");
var DelayedAction_1 = require("../Shared/DelayedAction");
describe('Delayed Action', function () {
    it('Delay action', function () { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var delayedAction, startTime, result, endTime, ts;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    delayedAction = new DelayedAction_1.DelayedAction(function () {
                        return 1 + 1;
                    }, 100);
                    startTime = new Date();
                    return [4 /*yield*/, delayedAction.execute()];
                case 1:
                    result = _a.sent();
                    endTime = new Date();
                    ts = endTime.getTime() - startTime.getTime();
                    (0, chai_1.expect)(ts).to.be.at.least(100);
                    (0, chai_1.expect)(result).to.equal(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Delay action with args', function () { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var delayedAction, result;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    delayedAction = new DelayedAction_1.DelayedAction(function (x, y) {
                        return x + y;
                    }, 100);
                    return [4 /*yield*/, delayedAction.execute(1, 2)];
                case 1:
                    result = _a.sent();
                    (0, chai_1.expect)(result).to.equal(3);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Delay action with Argument', function () { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var delayedAction, result;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    delayedAction = new DelayedAction_1.DelayedAction(function (x, y) {
                        return new Promise(function (resolve) {
                            setTimeout(function () {
                                resolve(x + y);
                            }, 100);
                        });
                    }, 100);
                    return [4 /*yield*/, delayedAction.execute(3, 4)];
                case 1:
                    result = _a.sent();
                    (0, chai_1.expect)(result).to.equal(7);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=DelayedActionTest.js.map