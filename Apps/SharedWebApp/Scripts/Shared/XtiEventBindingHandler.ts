import * as ko from 'knockout';
import * as $ from 'jquery';

export class XtiEventBindingHandler implements ko.BindingHandler<any> {
    update(element, valueAccessor) {
        let eventBindingOptions: IXtiEventBindingOptions = ko.unwrap(valueAccessor());
        if (eventBindingOptions) {
            let $element = $(element);
            for (let key in eventBindingOptions) {
                let eventOptions = eventBindingOptions[key];
                if (eventOptions.callback) {
                    $element.on(`${key}.xtiEvent`, eventOptions.selector, function (event) {
                        let vm = ko.dataFor(this);
                        let view = vm && vm.view ? vm.view : vm;
                        eventOptions.callback.call(
                            view, view, event.originalEvent || event
                        );
                        if (eventOptions.preventDefault) {
                            event.preventDefault();
                        }
                        return false;
                    });
                }
            }
            ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
                let $el = $element;
                if ($el) {
                    $el.off('.xtiEvent');
                }
                $element = null;
            });
        }
    }
}