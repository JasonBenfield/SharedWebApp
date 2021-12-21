"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPageContext = void 0;
var DefaultPageContext = /** @class */ (function () {
    function DefaultPageContext() {
    }
    DefaultPageContext.prototype.load = function () {
        pageContext.AppTitle = 'App';
        pageContext.PageTitle = 'Page';
        pageContext.UserName = 'Jason.Benfield';
        pageContext.IsAuthenticated = true;
    };
    return DefaultPageContext;
}());
exports.DefaultPageContext = DefaultPageContext;
//# sourceMappingURL=DefaultPageContext.js.map