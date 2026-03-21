
interface ICssClasses {
    [name: string]: ICssClass;
}

export interface ICssClass {
    readonly name: string;
    remove(): this;
    toCss(): string;
}

export abstract class CssClass implements ICssClass {
    readonly name = this.constructor.name;
    private isRemoved = false;

    remove() {
        this.isRemoved = true;
        return this;
    }

    toCss() {
        let css: string;
        if (this.isRemoved) {
            css = "";
        }
        else {
            css = this.buildCss();
        }
        return css;
    }

    protected abstract buildCss(): string;

    toString() { return this.toCss(); }
}

export class CssClassName implements ICssClass {
    readonly name: string;
    private css: string;

    constructor(private readonly className: string) {
        this.css = className;
        this.name = `CssClassName:${className}`;
    }

    uncancel() {
        this.css = this.className;
        return this;
    }

    remove() {
        this.css = "";
        return this;
    }

    toCss() { return this.css; }
}

export class CssClassManager {
    private _value = "";
    private readonly css: ICssClasses = {};

    get value() { return this._value; }

    setCssClass(cssClass: ICssClass) {
        this.css[cssClass.name] = cssClass;
        const classNames: string[] = [];
        for (const key of Object.keys(this.css)) {
            const className = this.css[key].toCss().trim();
            if (className) {
                classNames.push(className);
            }
        }
        if (classNames.length > 0) {
            this._value = classNames.join(" ");
        }
        else {
            this._value = "";
        }
    }

    toString() {
        return this._value;
    }
}