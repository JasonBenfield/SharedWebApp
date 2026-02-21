import { EventManager } from "./EventManager";

type EventLayout = {
    postAddElement: ComponentViewEventArgs;
    preRemoveElement: ComponentViewEventArgs;
}

export interface IComponentView {
    show(): void;
    hide(): void;
    dispose(): void;
    addToParent(parent: HTMLElement): void;
    removeFromParent(): void;
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

    get isVisible() { return this._isVisible; }

    show() {
        if (!this._isVisible) {
            const parent = this._parent;
            if (parent) {
                this.addToParent(parent);
            }
            this._isVisible = true;
        }
    }

    hide() {
        if (this._isVisible) {
            const parent = this._parent;
            if (parent) {
                this.removeFromParent();
            }
            this._isVisible = false;
        }
    }

    addToParent(parent: HTMLElement) {
        if (this._isVisible) {
            const element = this.createElement();
            this._element = element;
            this._parent = parent;
            parent.appendChild(element);
            this._eventManager.events.postAddElement.invoke({
                element: element
            });
        }
    }

    removeFromParent() {
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
            const parent = element.parentElement;
            if (parent) {
                this._eventManager.events.preRemoveElement.invoke({
                    element: element
                });
                parent.removeChild(element);
            }
        }
        this._element = null;
    }
}

export interface ComponentViewEventArgs {
    element: HTMLElement;
} 
