import { EventManager } from "./EventManager";

type EventLayout = {
    postAddElement: ComponentViewEventArgs;
    preRemoveElement: ComponentViewEventArgs;
}

export interface IComponentView {
    show(): void;
    hide(): void;
    dispose(): void;
    addToDom(parent: HTMLElement): void;
    removeFromDom(): void;
}

export class ComponentView implements IComponentView {
    private readonly _eventManager = new EventManager<EventLayout>({
        postAddElement: null,
        preRemoveElement: null
    });
    readonly when = this._eventManager.when;
    private _element: HTMLElement | null = null;
    private _parent: HTMLElement | null = null;
    private _isVisible = true;

    constructor(private readonly createElement: () => HTMLElement) {
    }

    get element() { return this._element; }

    get parent() { return this._parent; }

    get isVisible() { return this._isVisible; }

    show() {
        this._isVisible = true;
        if (!this.element) {
            const parent = this._parent;
            if (parent) {
                this.addToDom(parent);
            }
        }
    }

    hide() {
        const element = this.element;
        if (element) {
            const parent = this._parent;
            if (parent) {
                this.removeFromDom();
            }
        }
        this._isVisible = false;
    }

    addToDom(parent: HTMLElement) {
        this._parent = parent;
        if (this._isVisible) {
            const element = this._element || this.createElement();
            this._element = element;
            parent.appendChild(element);
            this._eventManager.events.postAddElement.invoke({
                element: element
            });
        }
    }

    removeFromDom() {
        this._removeElement();
    }

    dispose() {
        this._removeElement();
        this._eventManager.dispose();
        this._isVisible = false;
        this._parent = null;
    }

    private _removeElement() {
        const element = this._element;
        if (element) {
            this._eventManager.events.preRemoveElement.invoke({
                element: element
            });
            element.remove();
        }
        this._element = null;
    }
}

export interface ComponentViewEventArgs {
    element: HTMLElement;
} 
