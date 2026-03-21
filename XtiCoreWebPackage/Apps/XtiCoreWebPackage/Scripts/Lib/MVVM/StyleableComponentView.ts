import { CssClassManager, ICssClass } from "../CssClass";
import { ICssStyle } from "../CssStyle";
import { ComponentView } from "./ComponentView";
import { Constructor, IHtmlAttributes } from "./Types";

export function StyleableComponentViewMixin<T extends Constructor<ComponentView>>(Base: T) {
    return class extends Base implements IStyleableComponentView {
        private readonly attributes: { [name: string]: string } = {};
        private readonly styles: { [name: string]: string } = {};
        private readonly cssClass = new CssClassManager();

        protected addToDom(index: number) {
            super.addToDom(index);
            const element = this.element;
            if (element) {
                for (const key in this.attributes) {
                    const value = this.attributes[key];
                    if (value !== undefined && value !== null) {
                        element.setAttribute(key, this.attributes[key]);
                    }
                }
            }
        }

        setCss(cssBuilder: ICssClass) {
            this.cssClass.setCssClass(cssBuilder);
            const css = this.cssClass.value;
            this.setAttribute("class", css ? css : null);
            return this;
        }

        clearStyle() {
            const keys = Object.keys(this.styles);
            for (const key of keys) {
                delete this.styles[key];
            }
            this.setAttribute("style", null);
            return this;
        }

        setStyle(style: ICssStyle) {
            const updatedStyles = style.toStyle();
            for (const name in updatedStyles) {
                const value = updatedStyles[name];
                if (value) {
                    Reflect.set(this.styles, name, value);
                }
                else {
                    delete this.styles[name];
                }
            }
            const styles: string[] = [];
            for (const name in this.styles) {
                const value = this.styles[name];
                styles.push(`${name}: ${value};`);
            }
            this.setAttribute("style", styles.length > 0 ? styles.join(" ") : null);
            return this;
        }

        setID(id: string) {
            return this.setAttribute("id", id);
        }

        setName(name: string) {
            return this.setAttribute("name", name);
        }

        setTitle(title: string) {
            return this.setAttribute("title", title);
        }

        protected setAttribute(name: string, value: string | null) {
            return this.setAttributes({ [name]: value });
        }

        setAttributes(updatedAttributes: IHtmlAttributes & { [name: string]: string | null }) {
            for (const name in updatedAttributes) {
                const value = updatedAttributes[name];
                if (value === undefined || value === null) {
                    delete this.attributes[name];
                }
                else {
                    Reflect.set(this.attributes, name, value);
                }
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
            return this;
        }
    };
}

export interface IStyleableComponentView {
    setCss(cssBuilder: ICssClass): this;

    clearStyle(): this;

    setStyle(style: ICssStyle): this;

    setID(id: string): this;

    setName(name: string): this;

    setTitle(title: string): this;

    setAttributes(updatedAttributes: IHtmlAttributes & { [name: string]: string | null }): this;
}