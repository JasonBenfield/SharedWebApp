import * as ko from 'knockout';
import { Dropdown } from 'bootstrap';
import * as $ from 'jquery';

export class DropdownBindingHandler implements ko.BindingHandler<any> {
    init(element: HTMLElement) {
        let $el = $(element);
        let $parentEl = $el.parent();
        let $menuEl = $parentEl.find('ul');
        if (!$menuEl.hasClass('dropdown-menu')) {
            $menuEl.addClass('dropdown-menu');
        }
        let dropdown = new Dropdown(element);
        $el.data('bs.dropdown', dropdown);
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            let d = dropdown;
            if (d) {
                d.dispose();
            }
            dropdown = null;
            $el = null;
        });
    }
}