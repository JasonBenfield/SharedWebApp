"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestClickableListItem = void 0;
var TextBlock_1 = require("../../Shared/Html/TextBlock");
var TestClickableListItem = /** @class */ (function () {
    function TestClickableListItem(i, view) {
        this.i = i;
        new TextBlock_1.TextBlock("Clickable ".concat(i), view.text);
    }
    return TestClickableListItem;
}());
exports.TestClickableListItem = TestClickableListItem;
//# sourceMappingURL=TestClickableItem.js.map