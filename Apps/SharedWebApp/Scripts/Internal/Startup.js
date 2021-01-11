"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startup = void 0;
var PageLoader_1 = require("../Shared/PageLoader");
var AppApiEvents_1 = require("../Shared/AppApiEvents");
var ConsoleLog_1 = require("../Shared/ConsoleLog");
var ModalErrorComponent_1 = require("../Shared/Error/ModalErrorComponent");
var tsyringe_1 = require("tsyringe");
var LogoutUrl_1 = require("./LogoutUrl");
var PageFrameViewModel_1 = require("../Shared/PageFrameViewModel");
function startup(pageVM, page) {
    tsyringe_1.container.register('PageVM', { useFactory: function (c) { return c.resolve(pageVM); } });
    tsyringe_1.container.register('Page', { useFactory: function (c) { return c.resolve(page); } });
    tsyringe_1.container.register(AppApiEvents_1.AppApiEvents, {
        useFactory: function (c) { return new AppApiEvents_1.AppApiEvents(function (err) {
            new ConsoleLog_1.ConsoleLog().error(err.toString());
            c.resolve(ModalErrorComponent_1.ModalErrorComponent).show(err.getErrors(), err.getCaption());
        }); }
    });
    tsyringe_1.container.register('LogoutUrl', {
        useToken: LogoutUrl_1.LogoutUrl
    });
    new PageLoader_1.PageLoader().load();
    var pageFrameVM = tsyringe_1.container.resolve(PageFrameViewModel_1.PageFrameViewModel);
    pageFrameVM.appTitle('App');
    pageFrameVM.pageTitle('Page');
    pageFrameVM.userName('Jason.Benfield');
    pageFrameVM.isAuthenticated(true);
}
exports.startup = startup;
//# sourceMappingURL=Startup.js.map