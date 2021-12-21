"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Startup_1 = require("../../Shared/Startup");
var AsyncCommand_1 = require("../../Shared/Command/AsyncCommand");
var DefaultPageContext_1 = require("../DefaultPageContext");
var MainPageView_1 = require("./MainPageView");
var TestCard_1 = require("./TestCard");
var MainPage = /** @class */ (function () {
    function MainPage(page) {
        new DefaultPageContext_1.DefaultPageContext().load();
        this.view = new MainPageView_1.MainPageView(page);
        this.testCard = new TestCard_1.TestCard(this.view.testCard);
        var refreshCommand = new AsyncCommand_1.AsyncCommand(this.refresh.bind(this));
        refreshCommand.animateIconWhenInProgress('spin');
        refreshCommand.add(this.view.refreshButton);
    }
    MainPage.prototype.refresh = function () {
        return this.testCard.refresh();
    };
    return MainPage;
}());
new MainPage(new Startup_1.Startup().build());
//# sourceMappingURL=MainPage.js.map