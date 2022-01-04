"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserPage_1 = require("../../Shared/User/UserPage");
var Startup_1 = require("../../Shared/Startup");
var DefaultPageContext_1 = require("../DefaultPageContext");
new DefaultPageContext_1.DefaultPageContext().load();
new UserPage_1.UserPage(new Startup_1.Startup().build(), null);
//# sourceMappingURL=MainPage.js.map