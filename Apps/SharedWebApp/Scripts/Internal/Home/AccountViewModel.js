"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountViewModel = void 0;
var tslib_1 = require("tslib");
var ComponentTemplateAsync_1 = require("../../Shared/ComponentTemplateAsync");
var HtmlComponentViewModel_1 = require("../../Shared/Html/HtmlComponentViewModel");
var AccountViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(AccountViewModel, _super);
    function AccountViewModel() {
        return _super.call(this, new ComponentTemplateAsync_1.ComponentTemplateAsync('account', '/Shared/Current/Home/Account')) || this;
    }
    return AccountViewModel;
}(HtmlComponentViewModel_1.HtmlComponentViewModel));
exports.AccountViewModel = AccountViewModel;
//# sourceMappingURL=AccountViewModel.js.map