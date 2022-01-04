"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorListItem = void 0;
var TextBlock_1 = require("../Html/TextBlock");
var ErrorListItem = /** @class */ (function () {
    function ErrorListItem(error, view) {
        new TextBlock_1.TextBlock(error.Message, view.message);
    }
    return ErrorListItem;
}());
exports.ErrorListItem = ErrorListItem;
//# sourceMappingURL=ErrorListItem.js.map