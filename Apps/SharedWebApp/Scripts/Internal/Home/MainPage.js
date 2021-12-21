"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Startup_1 = require("../../Shared/Startup");
var TextBlock_1 = require("../../Shared/Html/TextBlock");
var DefaultPageContext_1 = require("../DefaultPageContext");
var MainPage = /** @class */ (function () {
    function MainPage(page) {
        new DefaultPageContext_1.DefaultPageContext().load();
        page.addContent(new TextBlock_1.TextBlock('Shared Home Page'));
    }
    return MainPage;
}());
new MainPage(new Startup_1.Startup().build());
//# sourceMappingURL=MainPage.js.map