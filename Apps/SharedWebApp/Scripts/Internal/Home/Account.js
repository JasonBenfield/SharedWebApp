"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
var tslib_1 = require("tslib");
var HtmlComponent_1 = require("../../Shared/Html/HtmlComponent");
var AccountViewModel_1 = require("./AccountViewModel");
var Account = /** @class */ (function (_super) {
    tslib_1.__extends(Account, _super);
    function Account(vm) {
        if (vm === void 0) { vm = new AccountViewModel_1.AccountViewModel(); }
        return _super.call(this, vm) || this;
    }
    return Account;
}(HtmlComponent_1.HtmlComponent));
exports.Account = Account;
//# sourceMappingURL=Account.js.map