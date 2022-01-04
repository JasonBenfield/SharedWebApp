"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JustifyContentCss = void 0;
var CssClass_1 = require("./CssClass");
var JustifyContentCss = /** @class */ (function () {
    function JustifyContentCss(xs) {
        this.justify = {};
        this.xs(xs);
    }
    JustifyContentCss.start = function () {
        return new JustifyContentCss('start');
    };
    JustifyContentCss.end = function () {
        return new JustifyContentCss('end');
    };
    JustifyContentCss.center = function () {
        return new JustifyContentCss('center');
    };
    JustifyContentCss.prototype.xs = function (value) {
        this.justify.xs = value;
        return this;
    };
    JustifyContentCss.prototype.sm = function (value) {
        this.justify.sm = value;
        return this;
    };
    JustifyContentCss.prototype.md = function (value) {
        this.justify.md = value;
        return this;
    };
    JustifyContentCss.prototype.lg = function (value) {
        this.justify.lg = value;
        return this;
    };
    JustifyContentCss.prototype.xl = function (value) {
        this.justify.xl = value;
        return this;
    };
    JustifyContentCss.prototype.xxl = function (value) {
        this.justify.xxl = value;
        return this;
    };
    JustifyContentCss.prototype.cssClass = function () {
        var cssClass = new CssClass_1.CssClass();
        cssClass.addName(this.cssClassName('xs'));
        cssClass.addName(this.cssClassName('sm'));
        cssClass.addName(this.cssClassName('md'));
        cssClass.addName(this.cssClassName('lg'));
        cssClass.addName(this.cssClassName('xl'));
        cssClass.addName(this.cssClassName('xxl'));
        return cssClass;
    };
    JustifyContentCss.prototype.cssClassName = function (breakpoint) {
        var value = this.justify[breakpoint];
        if (value) {
            var breakpointPart = breakpoint === 'xs' ? '' : "-" + breakpoint;
            return "flex" + breakpointPart + "-" + value;
        }
        return '';
    };
    return JustifyContentCss;
}());
exports.JustifyContentCss = JustifyContentCss;
//# sourceMappingURL=JustifyContentCss.js.map