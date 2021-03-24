"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainPageViewModel = void 0;
var tslib_1 = require("tslib");
var PageViewModel_1 = require("../../Shared/PageViewModel");
var tsyringe_1 = require("tsyringe");
var AccountViewModel_1 = require("./AccountViewModel");
var MainPageViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(MainPageViewModel, _super);
    function MainPageViewModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //constructor() {
        //    super(template);
        //}
        _this.account = new AccountViewModel_1.AccountViewModel();
        return _this;
    }
    MainPageViewModel = tslib_1.__decorate([
        tsyringe_1.singleton()
    ], MainPageViewModel);
    return MainPageViewModel;
}(PageViewModel_1.PageViewModel));
exports.MainPageViewModel = MainPageViewModel;
//# sourceMappingURL=MainPageViewModel.js.map