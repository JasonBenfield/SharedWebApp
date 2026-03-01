
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
    private _parentView: ComponentView | null = null;
    private readonly _views: ComponentView[] = [];
    private _isVisible = true;

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

    get parentView() { return this._parentView; }

    get isVisible() { return this._isVisible; }

    show() {
        this._isVisible = true;
        const parentView = this._parentView;
        const index = parentView ? parentView._views.indexOf(this) : -1;
        this.addToDom(index);
    }

    hide() {
        const element = this.element;
        if (element) {
            const parent = this._parentView;
            if (parent) {
                this.removeFromDom();
            }
        }
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
        this._views.push(view);
        view.addToDom(index);
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
            let element = this._element;
            if (!element) {
                this._element = this.createElement();
                element = this._element;
            }
            const parentElement = this._parentView?.element;
            if (parentElement) {
                if (this._parentView?.constructor.name === "ListComponentView") {
                    console.log(`before addToDom: ${this._parentView?.element?.outerHTML}`);
                }
                if (index >= 0) {
                    const refElement = this.getReferenceElement(index);
                    if (refElement && refElement !== element) {
                        console.log(`insertBefore element: ${element.id}, parentElement: ${parentElement.id}, refElement: ${refElement.id}, index: ${index}`);
                        element.before(refElement);
                    }
                    else {
                        console.log(`appendChild element: ${element.id}, parentElement: ${parentElement.id}, index: ${index}`);
                        parentElement.appendChild(element);
                    }
                }
                else {
                    console.log(`appendChild element: ${element.id}, parentElement: ${parentElement.id}, index: ${index}`);
                    parentElement.appendChild(element);
                }
                if (this._parentView?.constructor.name === "ListComponentView") {
                    console.log(`after addToDom: ${this._parentView?.element?.outerHTML}`);
                }
            }
            let childIndex = 0;
            for (const view of this._views) {
                if (view.isVisible) {
                    view.addToDom(childIndex);
                    childIndex++;
                }
            }
        }
    }

    private getReferenceElement(index: number) {
        let refElement: HTMLElement | null = null;
        const parentView = this._parentView;
        if (parentView) {
            for (let i = index; i < parentView._views.length; i++) {
                refElement = parentView._views[i].element;
                if (refElement) {
                    break;
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
                if (refElement !== element) {
                    if (refElement) {
                        element.before(refElement);
                    }
                    else {
                        parentElement.appendChild(element);
                    }
                }
            }
        }
    }

    private removeFromDom() {
        this._removeElement();
    }

    private _isDisposed = false;

    dispose() {
        for (const view of this._views) {
            view.dispose();
        }
        this._views.splice(0, this._views.length);
        this._removeElement();
        this._isVisible = false;
        this._parentView = null;
        this._isDisposed = true;
    }

    private _removeElement() {
        const element = this._element;
        if (element && element.parentElement) {
            element.remove();
        }
        this._element = null;
    }
}