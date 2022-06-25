import { IContainerView } from "./Types";
import * as $ from 'jquery';

export class HtmlElementView implements IContainerView {

    static fromTag(container: IContainerView, tagName: keyof HTMLElementTagNameMap) {
        return new HtmlElementView(container, () => document.createElement(tagName));
    }

    static body() {
        return HtmlElementView.fromElement(document.body);
    }

    static fromElement(element: HTMLElement) {
        return new HtmlElementView(null, () => element);
    }

    readonly element: HTMLElement;

    private isAdded = false;

    private constructor(protected readonly container: IContainerView, createElement: () => HTMLElement) {
        this.element = createElement();
        this.addToContainer();
    }

    setAttributes(attributes: any) {
        if (attributes) {
            for (const key in this.element.attributes) {
                if (!attributes[key]) {
                    this.element.removeAttribute(key);
                }
            }
            for (const key in attributes) {
                this.setAttribute(attributes, key);
            }
        }
    }

    setAttribute(attributes: any, name: string) {
        const value = attributes[name];
        if (value === true) {
            this.element.setAttribute(name, '');
        }
        else if (value) {
            const formatted = this.formatValue(value);
            if (formatted) {
                this.element.setAttribute(name, formatted);
            }
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
        this.element.removeChild(el);
    }

    addToContainer() {
        if (!this.isAdded) {
            if (this.container) {
                this.container.addElement(this.element);
            }
            this.isAdded = true;
        }
    }

    removeFromContainer() {
        if (this.container) {
            this.container.removeElement(this.element);
        }
        this.isAdded = false;
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