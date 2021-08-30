"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xtistart_1 = require("xtistart");
var TextBlock_1 = require("../../Shared/Html/TextBlock");
var MainPage = /** @class */ (function () {
    function MainPage(page) {
        page.addContent(new TextBlock_1.TextBlock('Shared Home Page'));
    }
    return MainPage;
}());
new MainPage(new xtistart_1.Startup().build());
//# sourceMappingURL=MainPage.js.map