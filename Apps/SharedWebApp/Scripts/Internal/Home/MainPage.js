"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Startup_1 = require("../../Shared/Startup");
var TextBlock_1 = require("../../Shared/Html/TextBlock");
var DefaultPageContext_1 = require("../DefaultPageContext");
var MainPageView_1 = require("./MainPageView");
var MainPage = /** @class */ (function () {
    function MainPage(page) {
        var view = new MainPageView_1.MainPageView(page);
        new TextBlock_1.TextBlock('Shared Home Page', view.text);
    }
    return MainPage;
}());
new DefaultPageContext_1.DefaultPageContext().load();
new MainPage(new Startup_1.Startup().build());
//# sourceMappingURL=MainPage.js.map