
type IHtmlEventListener = (el: HTMLElement, evt: Event) => void;

interface IHtmlEventListeners {
    [name: string]: IHtmlEventListener;
}

export class ComponentView {
    static block() {
        return new ComponentView("div");
    }

    static span() {
        return new ComponentView("span");
    }

    static label() {
        return new ComponentView("label");
    }

    static heading(size: 1 | 2 | 3 | 4 | 5 | 6) {
        return new ComponentView(`h${size}`);
    }

    private readonly createElement: () => HTMLElement;
    private _element: HTMLElement | null = null;
    private readonly _htmlEventListeners: IHtmlEventListeners = {};
    private _parentView: ComponentView | null = null;
    private readonly _views: ComponentView[] = [];
    private _isVisible = true;
    protected isParentRequired = true;

    constructor();
    constructor(tagName: string);
    constructor(createElement: () => HTMLElement);
    constructor(tagNameOrCreateElement?: string | (() => HTMLElement)) {
        if (!tagNameOrCreateElement) {
            this.createElement = () => document.createElement("div");
        }
        else if (typeof tagNameOrCreateElement === "string") {
            this.createElement = () => document.createElement(tagNameOrCreateElement);
        }
        else {
            this.createElement = tagNameOrCreateElement;
        }
    }

    get element() { return this._element; }

    get isVisible() { return this._isVisible; }

    protected setEventListener<K extends keyof HTMLElementEventMap>(eventType: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any) {
        const element = this._element;
        const listeners: any = this._htmlEventListeners;
        if (element) {
            const originalListener = listeners[eventType];
            if (originalListener) {
                element.removeEventListener(eventType, originalListener);
            }
        }
        listeners[eventType] = listener;
        if (element) {
            element.addEventListener(eventType, listener);
        }
    }

    show() {
        this._isVisible = true;
        const parentView = this._parentView;
        const index = parentView ? parentView._views.indexOf(this) : -1;
        this.addToDom(index);
    }

    hide() {
        this._removeElement();
        this._isVisible = false;
    }

    protected addChildView<T extends ComponentView>(view: T) {
        if (Object.is(this, view)) {
            throw new Error("Cannot add view to itself");
        }
        return this.insertChildView<T>(view, -1);
    }

    protected insertChildView<T extends ComponentView>(view: T, index: number) {
        if (Object.is(this, view)) {
            throw new Error("Cannot insert view into itself");
        }
        view._parentView = this;
        view.addToDom(index);
        if (index > -1) {
            this._views.splice(index, 0, view);
        }
        else {
            this._views.push(view);
        }
        return view;
    }

    protected removeAllChildViews() {
        for (const view of this._views) {
            view.dispose();
        }
        this._views.splice(0, this._views.length);
    }

    protected removeChildView(view: ComponentView) {
        const views = this._views;
        if (views) {
            const index = this._views.indexOf(view);
            if (index > -1) {
                this._views.splice(index, 1);
            }
        }
        view.dispose();
    }

    protected addToDom(index: number) {
        if (this._isVisible) {
            const parentElement = this._parentView?.element;
            if (parentElement) {
                let element = this._element;
                if (!element) {
                    this._element = this.createElement();
                    element = this._element;
                    for (const key in this._htmlEventListeners) {
                        const listener: any = this._htmlEventListeners[key];
                        element.addEventListener(key, listener);
                    }
                }
                if (index >= 0) {
                    const refElement = this.getReferenceElement(index);
                    if (refElement) {
                        if (refElement !== element) {
                            parentElement.insertBefore(element, refElement);
                        }
                    }
                    else {
                        parentElement.appendChild(element);
                    }
                }
                else if (element.parentElement !== parentElement) {
                    parentElement.appendChild(element);
                }
            }
            else if (!this.isParentRequired) {
                let element = this._element;
                if (!element) {
                    this._element = this.createElement();
                    element = this._element;
                }
            }
            if (parentElement || !this.isParentRequired) {
                let childIndex = 0;
                for (const view of this._views) {
                    view.addToDom(childIndex);
                    childIndex++;
                }
            }
        }
    }

    private getReferenceElement(index: number) {
        let refElement: HTMLElement | null = null;
        let elementIndex = index;
        const parentView = this._parentView;
        const parentElement = parentView?._element;
        if (parentView && parentElement) {
            const views = parentView._views;
            for (let i = 0; i < index; i++) {
                if (!views[i].isVisible) {
                    elementIndex--;
                }
            }
            if (elementIndex > -1) {
                const childElement = parentElement.children[elementIndex];
                if (childElement instanceof HTMLElement) {
                    refElement = childElement;
                }
            }
        }
        return refElement;
    }

    moveTo(toIndex: number) {
        const parentView = this._parentView;
        if (parentView) {
            parentView.moveChildView(this, toIndex);
        }
    }

    private moveChildView(view: ComponentView, toIndex: number) {
        const index = this._views.indexOf(view);
        if (index > -1 && index !== toIndex) {
            this._views.splice(index, 1);
            this._views.splice(toIndex > index ? toIndex - 1 : toIndex, 0, view);
            view.moveElement(toIndex);
        }
    }

    private moveElement(toIndex: number) {
        if (this._isVisible) {
            const element = this._element;
            const parentElement = this._parentView?.element;
            if (element && parentElement) {
                const refElement = this.getReferenceElement(toIndex);
                if (refElement) {
                    parentElement.insertBefore(element, refElement);
                }
                else if (element.parentElement !== parentElement) {
                    parentElement.appendChild(element);
                }
            }
        }
    }

    dispose() {
        const views = this._views.splice(0, this._views.length);
        for (const view of views) {
            view.dispose();
        }
        this._removeElement();
        const keys = Object.keys(this._htmlEventListeners);
        for (const key of keys) {
            delete this._htmlEventListeners[key];
        }
        this._isVisible = false;
        this._parentView = null;
    }

    private _removeElement() {
        const element = this._element;
        if (element) {
            const keys = Object.keys(this._htmlEventListeners);
            for (const key of keys) {
                const listener: any = this._htmlEventListeners[key];
                element.removeEventListener(key, listener);
            }
            if (element.parentElement) {
                element.remove();
            }
        }
        this._element = null;
    }
}