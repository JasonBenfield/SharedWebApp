"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountViewModel = void 0;
var ko = require("knockout");
var ComponentTemplateAsync_1 = require("../../Shared/ComponentTemplateAsync");
var AccountViewModel = /** @class */ (function () {
    function AccountViewModel() {
        this.template = ko.observable('account');
        new ComponentTemplateAsync_1.ComponentTemplateAsync(this.template(), '/Shared/Current/Home/Account').register();
    }
    return AccountViewModel;
}());
exports.AccountViewModel = AccountViewModel;
//# sourceMappingURL=AccountViewModel.js.map