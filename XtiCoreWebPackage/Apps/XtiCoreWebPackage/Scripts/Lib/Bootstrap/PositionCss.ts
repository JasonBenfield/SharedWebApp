import { CssClass } from "../CssClass";

export class PositionCss extends CssClass {
    static remove() { return new PositionCss("").remove(); }

    static absolute() {
        return new PositionCss("absolute");
    }

    static fixed() {
        return new PositionCss("fixed");
    }

    static sticky() {
        return new PositionCss("sticky");
    }

    static stickyAtBotoom() {
        return new PositionCss("sticky").bottom(0);
    }

    static stickyAtTop() {
        return new PositionCss("sticky").top(0);
    }

    static stickyAtStart() {
        return new PositionCss("sticky").start(0);
    }

    static stickyAtEnd() {
        return new PositionCss("sticky").end(0);
    }

    static relative() {
        return new PositionCss("relative");
    }

    private _top: number | null = null;
    private _bottom: number | null = null;
    private _start: number | null = null;
    private _end: number | null = null;
    private _translateMiddle = "";

    private constructor(private readonly position: string) {
        super();
    }

    top(top: 0 | 50 | 100) {
        this._top = top;
        return this;
    }

    bottom(bottom: 0 | 50 | 100) {
        this._bottom = bottom;
        return this;
    }

    start(start: 0 | 50 | 100) {
        this._start = start;
        return this;
    }

    end(end: 0 | 50 | 100) {
        this._end = end;
        return this;
    }

    translateMiddle() {
        this._translateMiddle = "translate-middle";
        return this;
    }

    translateMiddleX() {
        this._translateMiddle = "translate-middle-x";
        return this;
    }

    translateMiddleY() {
        this._translateMiddle = "translate-middle-y";
        return this;
    }

    protected buildCss() {
        const classNames: string[] = [];
        if (this.position) {
            classNames.push(`position-${this.position}`);
        }
        if (this._top !== null) {
            classNames.push(`top-${this._top}`);
        }
        if (this._bottom !== null) {
            classNames.push(`bottom-${this._bottom}`);
        }
        if (this._start !== null) {
            classNames.push(`start-${this._start}`);
        }
        if (this._end !== null) {
            classNames.push(`end-${this._end}`);
        }
        if (this._translateMiddle) {
            classNames.push(this._translateMiddle);
        }
        return classNames.join(" ");
    }
}