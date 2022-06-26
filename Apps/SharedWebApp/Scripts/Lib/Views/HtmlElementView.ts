import * as $ from 'jquery';

export class HtmlElementView {

    static fromTag(tagName: keyof HTMLElementTagNameMap) {
        return new HtmlElementView(() => document.createElement(tagName));
    }

    static root() {
        const root = document.body.appendChild(document.createElement('div'));
        root.style.display = 'contents';
        return HtmlElementView.fromElement(root);
    }

    static fromElement(element: HTMLElement) {
        return new HtmlElementView(() => element);
    }

    readonly element: HTMLElement;

    private constructor(createElement: () => HTMLElement) {
        this.element = createElement();
    }

    setAttributes(attributes: any) {
        if (!attributes) {
            attributes = {};
        }
        for (let i = 0; i < this.element.attributes.length; i++) {
            const attribute = this.element.attributes.item(i);
            const value = attributes[attribute.name];
            if (!value) {
                this.element.removeAttribute(attribute.name);
            }
        }
        for (const key in attributes) {
            this.setAttribute(attributes, key);
        }
    }

    setAttribute(attributes: any, name: string) {
        const value = attributes[name];
        if (value === true) {
            this.element.setAttribute(name, '');
        }
        else if (value) {
            const formatted = this.formatValue(value);
            this.element.setAttribute(name, formatted);
        }
    }

    private formatValue(value: any) {
        if (typeof value === 'boolean') {
            return '';
        }
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number') {
            return value.toString();
        }
        let objStr = '';
        for (const key in value) {
            const childValue = value[key];
            if (childValue) {
                if (objStr) {
                    objStr += '; ';
                }
                const formatted = this.formatValue(childValue);
                objStr += `${key}: ${formatted}`;
            }
        }
        return objStr;
    }

    addElement(el: HTMLElement) {
        this.element.appendChild(el);
    }

    removeElement(el: HTMLElement) {
        if (el && el.parentElement) {
            this.element.removeChild(el);
        }
    }

    replaceElements(viewElements: HTMLElement[]) {
        this.element.replaceChildren(...viewElements);
    }

    setText(text: string) {
        this.element.innerText = text;
    }

    hasElement(element: HTMLElement) {
        return this.element.contains(element);
    }

    on(evtName: string, selector: string, preventDefault: boolean, action: (sourceElement: HTMLElement) => void) {
        $(this.element).on(
            evtName,
            selector,
            function (event: JQueryEventObject) {
                action(this);
                if (preventDefault) {
                    event.preventDefault();
                }
                return false;
            }
        );
    }
}