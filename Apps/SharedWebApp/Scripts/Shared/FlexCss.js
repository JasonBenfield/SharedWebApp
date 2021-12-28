"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexWrap = exports.FlexDirection = exports.FlexFill = exports.FlexCss = void 0;
var CssClass_1 = require("./CssClass");
var FlexCss = /** @class */ (function () {
    function FlexCss() {
        this._direction = new FlexDirection();
        this._fill = new FlexFill();
        this._wrap = new FlexWrap();
    }
    FlexCss.prototype.direction = function (configure) {
        configure(this._direction);
    };
    FlexCss.prototype.row = function () {
        this._direction.xs('row');
        return this;
    };
    FlexCss.prototype.column = function () {
        this._direction.xs('column');
        return this;
    };
    FlexCss.prototype.fill = function (configure) {
        if (configure) {
            configure(this._fill);
        }
        else {
            this._fill.xs();
        }
        return this;
    };
    FlexCss.prototype.wrap = function (configure) {
        if (configure) {
            configure(this._wrap);
        }
        else {
            this._wrap.xs('wrap');
        }
        return this;
    };
    FlexCss.prototype.wrapReverse = function () {
        this._wrap.xs('wrap-reverse');
        return this;
    };
    FlexCss.prototype.nowrap = function () {
        this._wrap.xs('nowrap');
        return this;
    };
    FlexCss.prototype.cssClass = function () {
        var cssClass = new CssClass_1.CssClass();
        cssClass.addFrom(this._direction.getCssClass());
        cssClass.addFrom(this._fill.getCssClass());
        cssClass.addFrom(this._wrap.getCssClass());
        return cssClass;
    };
    return FlexCss;
}());
exports.FlexCss = FlexCss;
var FlexFill = /** @class */ (function () {
    function FlexFill() {
        this.fill = {};
    }
    FlexFill.prototype.xs = function () {
        this.fill.xs = true;
        return this;
    };
    FlexFill.prototype.sm = function () {
        this.fill.sm = true;
        return this;
    };
    FlexFill.prototype.md = function () {
        this.fill.md = true;
        return this;
    };
    FlexFill.prototype.lg = function () {
        this.fill.lg = true;
        return this;
    };
    FlexFill.prototype.xl = function () {
        this.fill.xl = true;
        return this;
    };
    FlexFill.prototype.xxl = function () {
        this.fill.xxl = true;
        return this;
    };
    FlexFill.prototype.getCssClass = function () {
        var cssClass = new CssClass_1.CssClass();
        cssClass.addName(this.cssClassName('xs'));
        cssClass.addName(this.cssClassName('sm'));
        cssClass.addName(this.cssClassName('md'));
        cssClass.addName(this.cssClassName('lg'));
        cssClass.addName(this.cssClassName('xl'));
        cssClass.addName(this.cssClassName('xxl'));
        return cssClass;
    };
    FlexFill.prototype.cssClassName = function (breakpoint) {
        var value = this.fill[breakpoint];
        if (value) {
            var breakpointPart = breakpoint === 'xs' ? '' : "-" + breakpoint;
            return "flex" + breakpointPart + "-fill";
        }
        return '';
    };
    return FlexFill;
}());
exports.FlexFill = FlexFill;
var FlexDirection = /** @class */ (function () {
    function FlexDirection(xs) {
        this.dir = {};
        this.xs(xs);
    }
    FlexDirection.prototype.xs = function (value) {
        this.dir.xs = value;
        return this;
    };
    FlexDirection.prototype.sm = function (value) {
        this.dir.sm = value;
        return this;
    };
    FlexDirection.prototype.md = function (value) {
        this.dir.md = value;
        return this;
    };
    FlexDirection.prototype.lg = function (value) {
        this.dir.lg = value;
        return this;
    };
    FlexDirection.prototype.xl = function (value) {
        this.dir.xl = value;
        return this;
    };
    FlexDirection.prototype.xxl = function (value) {
        this.dir.xxl = value;
        return this;
    };
    FlexDirection.prototype.reverse = function () {
        this.isReversed = true;
        return this;
    };
    FlexDirection.prototype.getCssClass = function () {
        var cssClass = new CssClass_1.CssClass();
        cssClass.addName(this.cssClassName('xs'));
        cssClass.addName(this.cssClassName('sm'));
        cssClass.addName(this.cssClassName('md'));
        cssClass.addName(this.cssClassName('lg'));
        cssClass.addName(this.cssClassName('xl'));
        cssClass.addName(this.cssClassName('xxl'));
        return cssClass;
    };
    FlexDirection.prototype.cssClassName = function (breakpoint) {
        var value = this.dir[breakpoint];
        if (value) {
            var breakpointPart = breakpoint === 'xs' ? '' : "-" + breakpoint;
            var reversePart = this.isReversed ? '-reverse' : '';
            return "flex" + breakpointPart + "-" + value + reversePart;
        }
        return '';
    };
    return FlexDirection;
}());
exports.FlexDirection = FlexDirection;
var FlexWrap = /** @class */ (function () {
    function FlexWrap(xs) {
        this.wrap = {};
        this.xs(xs);
    }
    FlexWrap.prototype.xs = function (value) {
        this.wrap.xs = value;
        return this;
    };
    FlexWrap.prototype.sm = function (value) {
        this.wrap.sm = value;
        return this;
    };
    FlexWrap.prototype.md = function (value) {
        this.wrap.md = value;
        return this;
    };
    FlexWrap.prototype.lg = function (value) {
        this.wrap.lg = value;
        return this;
    };
    FlexWrap.prototype.xl = function (value) {
        this.wrap.xl = value;
        return this;
    };
    FlexWrap.prototype.xxl = function (value) {
        this.wrap.xxl = value;
        return this;
    };
    FlexWrap.prototype.getCssClass = function () {
        var cssClass = new CssClass_1.CssClass();
        cssClass.addName(this.cssClassName('xs'));
        cssClass.addName(this.cssClassName('sm'));
        cssClass.addName(this.cssClassName('md'));
        cssClass.addName(this.cssClassName('lg'));
        cssClass.addName(this.cssClassName('xl'));
        cssClass.addName(this.cssClassName('xxl'));
        return cssClass;
    };
    FlexWrap.prototype.cssClassName = function (breakpoint) {
        var value = this.wrap[breakpoint];
        if (value) {
            var breakpointPart = breakpoint === 'xs' ? '' : "-" + breakpoint;
            return "flex" + breakpointPart + "-" + value;
        }
        return '';
    };
    return FlexWrap;
}());
exports.FlexWrap = FlexWrap;
//# sourceMappingURL=FlexCss.js.map