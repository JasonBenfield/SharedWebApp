"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalErrorGroupComponent = void 0;
var Enumerable_1 = require("../Enumerable");
var Events_1 = require("../Events");
var ListGroup_1 = require("../ListGroup/ListGroup");
var ModalErrorListItem_1 = require("./ModalErrorListItem");
var ModalErrorGroupComponent = /** @class */ (function () {
    function ModalErrorGroupComponent(view) {
        this.view = view;
        this._errorSelected = new Events_1.DefaultEvent(this);
        this.errorSelected = this._errorSelected.handler();
        this.errors = new ListGroup_1.ListGroup(this.view.errors);
        this.errors.itemClicked.register(this.onErrorClicked.bind(this));
    }
    ModalErrorGroupComponent.prototype.onErrorClicked = function (errorListItem) {
        this._errorSelected.invoke(errorListItem.error);
    };
    ModalErrorGroupComponent.prototype.load = function (caption, errors, isFirst) {
        if (isFirst) {
            this.view.hideHR();
        }
        else {
            this.view.showHR();
        }
        this.view.setCaption(caption);
        var anyCaptions = new Enumerable_1.Any(new Enumerable_1.FilteredArray(errors, function (e) { return Boolean(e.Caption); })).value();
        this.errors.setItems(errors, function (e, itemView) {
            return new ModalErrorListItem_1.ModalErrorListItem(e, itemView, anyCaptions);
        });
    };
    return ModalErrorGroupComponent;
}());
exports.ModalErrorGroupComponent = ModalErrorGroupComponent;
//# sourceMappingURL=ModalErrorGroupComponent.js.map