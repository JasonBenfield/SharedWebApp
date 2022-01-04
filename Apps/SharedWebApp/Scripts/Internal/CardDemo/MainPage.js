"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Startup_1 = require("../../Shared/Startup");
var AsyncCommand_1 = require("../../Shared/Command/AsyncCommand");
var DefaultPageContext_1 = require("../DefaultPageContext");
var MainPageView_1 = require("./MainPageView");
var TestCard_1 = require("./TestCard");
var TextBlock_1 = require("../../Shared/Html/TextBlock");
var MainPage = /** @class */ (function () {
    function MainPage(page) {
        var view = new MainPageView_1.MainPageView(page);
        new TextBlock_1.TextBlock('Card Demo', view.heading);
        this.testCard = new TestCard_1.TestCard(view.testCard);
        var refreshCommand = new AsyncCommand_1.AsyncCommand(this.refresh.bind(this));
        refreshCommand.animateIconWhenInProgress('spin');
        refreshCommand.add(view.refreshButton);
    }
    MainPage.prototype.refresh = function () {
        return this.testCard.refresh();
    };
    return MainPage;
}());
new DefaultPageContext_1.DefaultPageContext().load();
new MainPage(new Startup_1.Startup().build());
//# sourceMappingURL=MainPage.js.map