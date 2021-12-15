"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalErrorComponent = void 0;
var Command_1 = require("../Command/Command");
var Events_1 = require("../Events");
var ModalErrorGroupComponent_1 = require("./ModalErrorGroupComponent");
var ModalErrorComponent = /** @class */ (function () {
    function ModalErrorComponent(view) {
        this.view = view;
        this.errorGroups = [];
        this._errorSelected = new Events_1.DefaultEvent(this);
        this.errorSelected = this._errorSelected.handler();
        this.view.closed.register(this.onClosed.bind(this));
        new Command_1.Command(this.hide.bind(this)).add(this.view.okButton);
    }
    ModalErrorComponent.prototype.onClosed = function () {
        this.clearErrors();
    };
    ModalErrorComponent.prototype.show = function (errors, caption) {
        if (caption === void 0) { caption = ''; }
        var group = new ModalErrorGroupComponent_1.ModalErrorGroupComponent(this.view.errorGroup());
        group.errorSelected.register(this.onErrorSelected.bind(this));
        group.load(caption, errors, this.errorGroups.length === 0);
        this.errorGroups.push(group);
        if (errors.length === 1) {
            this.view.setTitle('An error occurred');
        }
        else {
            this.view.setTitle('Errors occurred');
        }
        this.view.showModal();
    };
    ModalErrorComponent.prototype.hide = function () {
        this.clearErrors();
        this.view.hideModal();
    };
    ModalErrorComponent.prototype.onErrorSelected = function (errorListItem) {
        this._errorSelected.invoke(errorListItem.error);
    };
    ModalErrorComponent.prototype.clearErrors = function () {
        this.errorGroups.splice(0, this.errorGroups.length);
        this.view.clearErrorGroups();
    };
    return ModalErrorComponent;
}());
exports.ModalErrorComponent = ModalErrorComponent;
//# sourceMappingURL=ModalErrorComponent.js.map