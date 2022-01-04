"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormGroup = void 0;
var TextBlock_1 = require("./TextBlock");
var FormGroup = /** @class */ (function () {
    function FormGroup(view) {
        this.captionText = new TextBlock_1.TextBlock('', view.caption);
    }
    FormGroup.prototype.getCaption = function () {
        return this.caption;
    };
    FormGroup.prototype.setCaption = function (caption) {
        this.caption = caption;
        this.captionText.setText(caption);
    };
    return FormGroup;
}());
exports.FormGroup = FormGroup;
//# sourceMappingURL=FormGroup.js.map