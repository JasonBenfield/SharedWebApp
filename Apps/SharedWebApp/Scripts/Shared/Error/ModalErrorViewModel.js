"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalErrorViewModel = void 0;
var ko = require("knockout");
var ModalErrorViewModel = /** @class */ (function () {
    function ModalErrorViewModel() {
        this.errors = ko.observableArray([]);
        this.caption = ko.observable('');
    }
    return ModalErrorViewModel;
}());
exports.ModalErrorViewModel = ModalErrorViewModel;
//# sourceMappingURL=ModalErrorViewModel.js.map