"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormGroup = void 0;
var FormGroup = /** @class */ (function () {
    function FormGroup(view) {
        this.view = view;
    }
    FormGroup.prototype.getCaption = function () {
        return this.caption;
    };
    FormGroup.prototype.setCaption = function (caption) {
        this.caption = caption;
        this.view.setCaption(caption);
    };
    return FormGroup;
}());
exports.FormGroup = FormGroup;
//# sourceMappingURL=FormGroup.js.map