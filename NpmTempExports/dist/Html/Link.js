"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
var WebPage_1 = require("../Api/WebPage");
var Link = /** @class */ (function () {
    function Link(view) {
        this.view = view;
        this.clicked = this.view.clicked;
        this.setHref('javascript:;');
        this.clicked.register(this.onClick.bind(this));
    }
    Link.prototype.onClick = function () {
        if (this.href && this.href !== 'javascript:;') {
            new WebPage_1.WebPage(this.href).open();
        }
    };
    Link.prototype.setHref = function (href) {
        this.href = href;
        this.view.setHref(href);
    };
    return Link;
}());
exports.Link = Link;
//# sourceMappingURL=Link.js.map