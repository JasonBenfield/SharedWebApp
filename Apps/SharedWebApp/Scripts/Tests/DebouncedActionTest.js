"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("mocha");
var chai_1 = require("chai");
var DelayedAction_1 = require("../Shared/DelayedAction");
var DebouncedAction_1 = require("../Shared/DebouncedAction");
describe('Debounced Action', function () {
    it('Debounced action', function () { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var counter, debouncedAction, timesExecuted, startTime;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    counter = 0;
                    debouncedAction = new DebouncedAction_1.DebouncedAction(function () {
                        return counter++;
                    }, 10);
                    timesExecuted = 0;
                    startTime = new Date();
                    while (new Date().getTime() - startTime.getTime() < 10) {
                        debouncedAction.execute();
                        timesExecuted++;
                    }
                    return [4 /*yield*/, DelayedAction_1.DelayedAction.delay(11)];
                case 1:
                    _a.sent();
                    (0, chai_1.expect)(timesExecuted).to.be.at.least(2);
                    (0, chai_1.expect)(counter).to.equal(1);
                    debouncedAction.execute();
                    return [4 /*yield*/, DelayedAction_1.DelayedAction.delay(11)];
                case 2:
                    _a.sent();
                    (0, chai_1.expect)(counter).to.equal(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Debounced action with promise', function () { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var counter, debouncedAction, timesExecuted, startTime;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    counter = 0;
                    debouncedAction = new DebouncedAction_1.DebouncedAction(function () {
                        return counter++;
                    }, 10);
                    timesExecuted = 0;
                    startTime = new Date();
                    while (new Date().getTime() - startTime.getTime() < 10) {
                        debouncedAction.execute();
                        timesExecuted++;
                    }
                    return [4 /*yield*/, DelayedAction_1.DelayedAction.delay(20)];
                case 1:
                    _a.sent();
                    (0, chai_1.expect)(timesExecuted).to.be.at.least(2);
                    (0, chai_1.expect)(counter).to.equal(1);
                    debouncedAction.execute();
                    return [4 /*yield*/, DelayedAction_1.DelayedAction.delay(11)];
                case 2:
                    _a.sent();
                    (0, chai_1.expect)(counter).to.equal(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Debounce action with Argument', function () { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var counter, debouncedAction, result;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    counter = 0;
                    debouncedAction = new DebouncedAction_1.DebouncedAction(function (x, y) {
                        console.log("x: ".concat(x, ": ").concat(typeof x, ", y: ").concat(y, ": ").concat(typeof y));
                        counter += x + y;
                        return counter;
                    }, 10);
                    result = debouncedAction.execute(3, 1);
                    return [4 /*yield*/, DelayedAction_1.DelayedAction.delay(20)];
                case 1:
                    _a.sent();
                    (0, chai_1.expect)(counter).to.equal(4);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=DebouncedActionTest.js.map