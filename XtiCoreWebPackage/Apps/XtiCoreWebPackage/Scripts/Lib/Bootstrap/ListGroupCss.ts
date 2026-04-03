import { CssClass } from "../CssClass";
import { ContextualClass } from "./ContextualClass";

export class ListGroupCss extends CssClass {
    static remove() { return new ListGroupCss().remove(); }

    private _isFlush = false;

    flush() {
        this._isFlush = true;
        return this;
    }

    buildCss() {
        const classNames: string[] = [];
        classNames.push("list-group");
        if (this._isFlush) {
            classNames.push("list-group-flush");
        }
        return classNames.join(" ");
    }
}

export class ListGroupItemCss extends CssClass {
    static remove() { return new ListGroupItemCss().remove(); }

    private _context = ContextualClass.default;

    context(context: ContextualClass) {
        this._context = context;
        return this;
    }

    private _isActiveSelection = false;

    activeSelection() {
        this._isActiveSelection = true;
        return this;
    }

    notActiveSelection() {
        this._isActiveSelection = false;
        return this;
    }

    private _isAction = false;

    action() {
        this._isAction = true;
        return this;
    }

    notAnAction() {
        this._isAction = false;
        return this;
    }


    buildCss() {
        const classNames: string[] = [];
        classNames.push("list-group-item");
        if (this._context !== ContextualClass.default) {
            classNames.push(this._context.append("list-group-item"));
        }
        if (this._isAction) {
            classNames.push("list-group-item-action");
        }
        if (this._isActiveSelection) {
            classNames.push("active");
        }
        return classNames.join(" ");
    }
}