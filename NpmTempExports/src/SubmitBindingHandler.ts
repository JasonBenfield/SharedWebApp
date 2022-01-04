import * as ko from 'knockout';
import * as _ from 'lodash';
import { DelayedAction } from './DelayedAction';

export class SubmitBindingHandler implements ko.BindingHandler {
    constructor() {
        this.init = this.init.bind(this);
    }

    init(element: HTMLElement, valueAccessor) {
        ko.utils.registerEventHandler(element, "submit", async (event) => {
            let unwrapped = ko.utils.unwrapObservable<any>(valueAccessor());
            if (unwrapped.requestExecute) {
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
                await DelayedAction.delay(300);
                unwrapped.requestExecute.call(unwrapped, element);
                if (event.preventDefault) {
                    event.preventDefault();
                }
                else {
                    event.returnValue = false;
                }
            }
            else if (_.isFunction(unwrapped)) {
                let model = ko.dataFor(element);
                let result = unwrapped.call(model, element);
                if (result !== true) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    else {
                        event.returnValue = false;
                    }
                }
            }
        });
    }
}