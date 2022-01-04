"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalBindingHandler = void 0;
var ko = require("knockout");
var bootstrap_1 = require("bootstrap");
var ModalBindingHandler = /** @class */ (function () {
    function ModalBindingHandler() {
    }
    ModalBindingHandler.prototype.init = function (element, valueAccessor) {
        var modal;
        element.addEventListener('hidden.bs.modal', function () {
            var options = ko.unwrap(valueAccessor());
            if (options) {
                options.handleClose();
            }
        });
        var computed = ko.computed(function () {
            var options = ko.unwrap(valueAccessor());
            if (options) {
                var command = options.command();
                if (command) {
                    if (command === 'show') {
                        if (!modal) {
                            var modalOptions = {
                                backdrop: options.backrop(),
                                keyboard: true,
                                focus: true
                            };
                            modal = new bootstrap_1.Modal(element, modalOptions);
                        }
                        modal.show();
                    }
                    else if (command === 'hide') {
                        if (modal) {
                            modal.hide();
                        }
                    }
                    options.command('');
                }
            }
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            var m = modal;
            if (m) {
                m.dispose();
            }
            modal = null;
            var c = computed;
            if (c) {
                c.dispose();
            }
            computed = null;
        });
    };
    return ModalBindingHandler;
}());
exports.ModalBindingHandler = ModalBindingHandler;
//# sourceMappingURL=ModalBindingHandler.js.map