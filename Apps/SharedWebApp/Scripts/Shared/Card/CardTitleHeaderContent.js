"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardTitleHeaderContent = void 0;
var CardTitleHeaderContent = /** @class */ (function () {
    function CardTitleHeaderContent(vm, title) {
        if (title === void 0) { title = ''; }
        this.vm = vm;
        this.setTitle(title);
    }
    CardTitleHeaderContent.prototype.setTitle = function (title) { this.vm.title(title); };
    return CardTitleHeaderContent;
}());
exports.CardTitleHeaderContent = CardTitleHeaderContent;
//# sourceMappingURL=CardTitleHeaderContent.js.map