﻿import * as $ from 'jquery';
import { DelayedAction } from '../DelayedAction';

interface IElementEvent {
    evtName: string;
    selector: string;
    action: (sourceElement: HTMLElement, evt: JQuery.Event) => void;
}

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
    private readonly handlers: IElementEvent[] = [];

    private constructor(createElement: () => HTMLElement) {
        this.element = createElement();
    }

    get offsetWidth() { return this.element.offsetWidth; }

    getViewID() {
        return this.element.id || '';
    }

    getViewName() {
        return this.element.attributes['name'] || '';
    }

    setAttributes(attributes: any) {
        if (!attributes) {
            attributes = {};
        }
        for (let i = 0; i < this.element.attributes.length; i++) {
            const attribute = this.element.attributes.item(i);
            const value = attributes[attribute.name];
            if (value === null || value === undefined || value === false) {
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
        else if (value === null || value === undefined || value === false) {
            this.element.removeAttribute(name);
        }
        else {
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
        if (el && !el.parentElement) {
            this.element.appendChild(el);
        }
    }

    removeElement(el: HTMLElement) {
        if (el && el.parentElement) {
            this.element.removeChild(el);
        }
    }

    replaceElements(viewElements: HTMLElement[]) {
        this.element.replaceChildren(...viewElements);
    }

    getTitle() {
        return this.element.attributes['title'] as string || '';
    }

    getText() {
        return this.element.innerText;
    }

    setText(text: string) {
        this.element.innerText = text;
    }

    hasElement(element: HTMLElement) {
        return this.element.contains(element);
    }

    scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
        new DelayedAction(() => this.element.scrollIntoView(arg), 1).execute();
    }

    on(evtName: string, selector: string, action: (sourceElement: HTMLElement, evt: JQuery.Event) => void) {
        const handler: IElementEvent = { evtName: evtName, selector: selector, action: action };
        this.handlers.push(handler);
        if (document.contains(this.element)) {
            this.registerEvent(handler);
        }
    }

    unregisterEvents() {
        $(this.element).off();
    }

    registerEvents() {
        $(this.element).off();
        for (const handler of this.handlers) {
            this.registerEvent(handler);
        }
    }

    private registerEvent(handler: IElementEvent) {
        $(this.element).on(
            handler.evtName,
            handler.selector,
            function (event: JQuery.Event) {
                return handler.action(this, event);
            }
        );
    }
}