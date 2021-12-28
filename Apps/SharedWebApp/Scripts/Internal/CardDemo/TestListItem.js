"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestListItem = void 0;
var TextBlock_1 = require("../../Shared/Html/TextBlock");
var TestListItem = /** @class */ (function () {
    function TestListItem(i, view) {
        new TextBlock_1.TextBlock("Item ".concat(i), view.text);
    }
    return TestListItem;
}());
exports.TestListItem = TestListItem;
//# sourceMappingURL=TestListItem.js.map