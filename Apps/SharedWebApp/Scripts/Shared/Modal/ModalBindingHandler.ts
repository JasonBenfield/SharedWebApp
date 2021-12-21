import * as ko from 'knockout';
import { ModalOptionsViewModel } from './ModalOptionsViewModel';
import { Modal } from 'bootstrap';

export class ModalBindingHandler implements ko.BindingHandler<ModalOptionsViewModel> {
    init(element: any, valueAccessor: () => ModalOptionsViewModel) {
        let modal: Modal; 
        element.addEventListener('hidden.bs.modal', function () {
            let options = ko.unwrap(valueAccessor());
            if (options) {
                options.handleClose();
            }
        });
        let computed = ko.computed(() => {
            let options = ko.unwrap(valueAccessor());
            if (options) {
                let command = options.command();
                if (command) {
                    if (command === 'show') {
                        if (!modal) {
                            let modalOptions: Modal.Options = {
                                backdrop: options.backrop(),
                                keyboard: true,
                                focus: true
                            };
                            modal = new Modal(element, modalOptions);
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
            let m = modal;
            if (m) {
                m.dispose();
            }
            modal = null;
            let c = computed;
            if (c) {
                c.dispose();
            }
            computed = null;
        });
    }
}