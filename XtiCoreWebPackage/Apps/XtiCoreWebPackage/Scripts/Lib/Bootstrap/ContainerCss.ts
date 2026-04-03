import { CssClass } from "../CssClass";
import { Breakpoints } from "./Breakpoints";

export class ContainerCss extends CssClass {
    static remove() { return new ContainerCss().remove(); }

    static xs() { return new ContainerCss().xs(); }

    static sm() { return new ContainerCss().sm(); }

    static md() { return new ContainerCss().md(); }

    static lg() { return new ContainerCss().lg(); }

    static xl() { return new ContainerCss().xl(); }

    static xxl() { return new ContainerCss().xxl(); }

    static fluid() { return new ContainerCss(true); }

    private breakpoints: {
        xs?: ContainerCssForBreakpoint,
        sm?: ContainerCssForBreakpoint,
        md?: ContainerCssForBreakpoint,
        lg?: ContainerCssForBreakpoint,
        xl?: ContainerCssForBreakpoint,
        xxl?: ContainerCssForBreakpoint
    } = {};

    xs() {
        return this.setBreakpoint("xs");
    }

    sm() {
        return this.setBreakpoint("sm");
    }

    md() {
        return this.setBreakpoint("md");
    }

    lg() {
        return this.setBreakpoint("lg");
    }

    xl() {
        return this.setBreakpoint("xl");
    }

    xxl() {
        return this.setBreakpoint("xxl");
    }

    private _isFluid = false;

    private constructor(isFluid = false) {
        super();
        this._isFluid = isFluid;
    }

    private setBreakpoint(breakpoint: Breakpoints) {
        this._isFluid = false;
        Reflect.set(this.breakpoints, breakpoint, new ContainerCssForBreakpoint(breakpoint));
        return this;

    }

    protected buildCss() {
        const classNames: string[] = [];
        if (this._isFluid) {
            classNames.push("container-fluid");
        }
        else {
            for (const key in this.breakpoints) {
                const breakpoint: ContainerCssForBreakpoint = Reflect.get(this.breakpoints, key);
                if (breakpoint) {
                    classNames.push(breakpoint.cssClassName());
                }
            }
        }
        return classNames.join(" ");
    }
}


class ContainerCssForBreakpoint {
    constructor(private readonly breakpoint: string) {
    }

    cssClassName() {
        return this.breakpoint === "xs" ? "container" : `container-${this.breakpoint}`;
    }

    toString() {
        return this.cssClassName();
    }
}
