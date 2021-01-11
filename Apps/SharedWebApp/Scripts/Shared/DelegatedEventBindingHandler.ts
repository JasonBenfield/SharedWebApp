import * as ko from 'knockout';
import * as $ from 'jquery';

export class DelegatedEventBindingHandler implements ko.BindingHandler<any> {
    init(element, valueAccessor, allBindings, viewModel, bindingContext) {
        let $element = $(element);
        let value: any = valueAccessor() || [];
        if (!$.isArray(value)) {
            value = [value];
        }
        let eventsToHandle: DelegatedEvent[] = value;
        for (let eventOptions of eventsToHandle) {
            $element.on(`${eventOptions.event}.delegatedEvent`, eventOptions.selector, function (event) {
                let context = ko.dataFor(this);
                let result = eventOptions.callback.call(viewModel, context, event.originalEvent || event);
                if (result !== true) {
                    event.preventDefault();
                }
                return result === undefined ? false : result;
            });
        }
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            let $el = $element;
            if ($el) {
                $el.off('.delegatedEvent');
            }
            $element = null;
        });
    }
}