import { JoinedStrings } from "./JoinedStrings";

export class CssClass implements ICssClass {
    private value: string | null = null;
    private readonly names: string[] = [];

    constructor(...initialNames: string[]) {
        if (initialNames) {
            this.addNames(...initialNames);
        }
    }

    clear() {
        this.names.splice(0, this.names.length);
        return this;
    }

    addFrom(cssClass: CssClass | ICssBuilder | null) {
        if (cssClass) {
            if (cssClass instanceof CssClass) {
                if (cssClass.value) {
                    this.addName(cssClass.value);
                }
            }
            else {
                const className = cssClass.cssClass()?.toString();
                if (className) {
                    this.addName(className);
                }
            }
        }
        return this;
    }

    addName(name: string | null) {
        return name ? this.addNames(name) : this;
    }

    addNames(...names: string[]) {
        if (names) {
            let added = false;
            for (const name of names) {
                if (this._addName(name)) {
                    added = true;
                }
            }
            if (added) {
                this.updateValue();
            }
        }
        return this;
    }

    private _addName(name: string) {
        let added = false;
        if (name) {
            const nameParts = name.split(/\s+/);
            if (nameParts.length > 1) {
                for (const namePart of nameParts) {
                    if (this._addName(namePart)) {
                        added = true;
                    }
                }
            }
            else {
                const index = this.names.indexOf(nameParts[0]);
                if (index < 0) {
                    this.names.push(nameParts[0]);
                    added = true;
                }
            }
        }
        return added;
    }

    removeName(name: string) {
        return this.removeNames(name);
    }

    removeNames(...names: string[]) {
        if (names) {
            let removed = false;
            for (const name of names) {
                if (this._removeName(name)) {
                    removed = true;
                }
            }
            if (removed) {
                this.updateValue();
            }
        }
        return this;
    }

    private _removeName(name: string) {
        let removed = false;
        if (name) {
            const nameParts = name.split(/\s+/);
            if (nameParts.length > 1) {
                for (const namePart of nameParts) {
                    if (this._removeName(namePart)) {
                        removed = true;
                    }
                }
            }
            else {
                const index = this.names.indexOf(nameParts[0]);
                if (index >= 0) {
                    this.names.splice(index, 1);
                    removed = true;
                }
            }
        }
        return removed;
    }

    private updateValue() {
        this.value = this.names.length > 0 ? new JoinedStrings(" ", this.names).value() : "";
    }

    includes(name: string) { return this.names.includes(name); }

    toString() {
        return this.value;
    }
}