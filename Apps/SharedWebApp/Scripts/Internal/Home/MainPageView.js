"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainPageView = void 0;
var TextBlockView_1 = require("../../Shared/Html/TextBlockView");
var MainPageView = /** @class */ (function () {
    function MainPageView(page) {
        this.text = page.addContent(new TextBlockView_1.TextBlockView());
    }
    return MainPageView;
}());
exports.MainPageView = MainPageView;
//# sourceMappingURL=MainPageView.js.map