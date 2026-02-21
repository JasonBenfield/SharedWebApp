import { ComponentView } from "./ComponentView";
import { IHtmlAttributes } from "./Types";

export class StyleableComponentView extends ComponentView {
    private readonly _attributes: { [name: string]: string } = {};

    constructor(createElement: () => HTMLElement) {
        super(createElement);
    }

    addToParent(parent: HTMLElement) {
        super.addToParent(parent);
        const element = this.element;
        if (element) {
            for (const key in this._attributes) {
                const value = this._attributes[key];
                if (value !== undefined && value !== null) {
                    element.setAttribute(key, this._attributes[key]);
                    console.log(`set element attribute ${key} to '${this._attributes[key]}'`);
                }
            }
        }
    }

    setID(id: string) {
        this.setAttribute("id", id);
    }

    setName(name: string) {
        this.setAttribute("name", name);
    }

    setTitle(title: string) {
        this.setAttribute("title", title);
    }

    protected setAttribute(name: string, value: string | null) {
        this.setAttributes({ [name]: value });
    }

    setAttributes(updatedAttributes: IHtmlAttributes & { [name: string]: string | null }) {
        for (const name in updatedAttributes) {
            const value = updatedAttributes[name];
            Reflect.set(this._attributes, name, value);
        }
        const element = this.element;
        if (element) {
            for (const name in updatedAttributes) {
                const value = updatedAttributes[name];
                if (value === undefined || value === null) {
                    element.removeAttribute(name);
                }
                else {
                    element.setAttribute(name, value);
                }
            }
        }
    }
}