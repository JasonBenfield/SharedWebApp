import { ComponentView, ComponentViewEventArgs } from "./ComponentView";
import { IHtmlAttributes } from "./Types";

export class AttributeManager {
    private readonly _attributes: { [name: string]: string } = {};
    private static count = 1;

    constructor(private readonly _view: ComponentView) {
        this.setAttribute("id", `component${AttributeManager.count}`);
        AttributeManager.count++;
        _view.when.postAddElement.then(this.onElementAdded.bind(this));
    }

    private onElementAdded(evt: CustomEvent<ComponentViewEventArgs>) {
        for (const key in this._attributes) {
            evt.detail.element.setAttribute(key, this._attributes[key]);
        }
    }

    setTitle(title: string) {
        this.setAttribute("title", title);
    }

    setAttributes(updatedAttributes: IHtmlAttributes & { [name: string]: string }) {
        const attributes = this._attributes;
        for (const name in updatedAttributes) {
            const value = updatedAttributes[name];
            if (value === undefined || value === null) {
                delete attributes[name];
            }
            else {
                attributes[name] = value;
            }
        }
        const element = this._view.element;
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

    setAttribute(name: string, value: string) {
        this.setAttributes({ [name]: value });
    }
}