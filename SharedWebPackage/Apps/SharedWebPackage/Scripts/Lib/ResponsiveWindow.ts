import { DebouncedAction } from "./DebouncedAction";
import { EventSource } from "./Events";

type Events = { sizeChanged: ResponsiveWindowSize; };

export class ResponsiveWindowSize {
    readonly width: number;
    readonly height: number;
    readonly breakpoint: WindowSizeBreakpoints;
    readonly previousBreakpoint: WindowSizeBreakpoints;

    constructor(previousBreakpoint?: WindowSizeBreakpoints) {
        this.width = window.outerWidth;
        this.height = window.outerHeight;
        if (window.outerWidth <= 576) {
            this.breakpoint = WindowSizeBreakpoints.xs;
        }
        else if (window.outerWidth <= 768) {
            this.breakpoint = WindowSizeBreakpoints.sm;
        }
        else if (window.outerWidth <= 992) {
            this.breakpoint = WindowSizeBreakpoints.md;
        }
        else if (window.outerWidth <= 1200) {
            this.breakpoint = WindowSizeBreakpoints.lg;
        }
        else if (window.outerWidth <= 1400) {
            this.breakpoint = WindowSizeBreakpoints.xl;
        }
        else {
            this.breakpoint = WindowSizeBreakpoints.xxl;
        }
        this.previousBreakpoint = previousBreakpoint === null || previousBreakpoint === undefined ?
            this.breakpoint :
            previousBreakpoint;
    }

    get hasChangedToXs() { return this.isXs && this.previousBreakpoint !== WindowSizeBreakpoints.xs; }
    get hasChangedFromXs() { return !this.isXs && this.previousBreakpoint === WindowSizeBreakpoints.xs; }
    get isXs() { return this.breakpoint === WindowSizeBreakpoints.xs; }

    get hasChangedToSm() { return this.isSm && this.previousBreakpoint !== WindowSizeBreakpoints.sm; }
    get hasChangedFromSm() { return !this.isSm && this.previousBreakpoint === WindowSizeBreakpoints.sm; }
    get isSm() { return this.breakpoint === WindowSizeBreakpoints.sm; }

    get hasChangedToMd() { return this.isMd && this.previousBreakpoint !== WindowSizeBreakpoints.md; }
    get hasChangedFromMd() { return !this.isMd && this.previousBreakpoint === WindowSizeBreakpoints.md; }
    get isMd() { return this.breakpoint === WindowSizeBreakpoints.md; }

    get hasChangedToLg() { return this.isLg && this.previousBreakpoint !== WindowSizeBreakpoints.lg; }
    get hasChangedFromLg() { return !this.isLg && this.previousBreakpoint === WindowSizeBreakpoints.lg; }
    get isLg() { return this.breakpoint === WindowSizeBreakpoints.lg; }

    get hasChangedToXl() { return this.isXl && this.previousBreakpoint !== WindowSizeBreakpoints.xl; }
    get hasChangedFromXl() { return !this.isXl && this.previousBreakpoint === WindowSizeBreakpoints.xl; }
    get isXl() { return this.breakpoint === WindowSizeBreakpoints.xl; }

    get hasChangedToXxl() { return this.isXxl && this.previousBreakpoint !== WindowSizeBreakpoints.xxl; }
    get hasChangedFromXxl() { return !this.isXxl && this.previousBreakpoint === WindowSizeBreakpoints.xxl; }
    get isXxl() { return this.breakpoint === WindowSizeBreakpoints.xxl; }

    get hasBreakpointChanged() { return this.breakpoint !== this.previousBreakpoint; }
}

enum WindowSizeBreakpoints {
    xs = 0,
    sm = 1,
    md = 2,
    lg = 3,
    xl = 4,
    xxl = 5
}

export class ResponsiveWindow {
    static readonly instance = new ResponsiveWindow();

    private currentSize: ResponsiveWindowSize;
    private readonly eventSource = new EventSource<Events>(this, { sizeChanged: null });
    readonly when = this.eventSource.when;

    private constructor() {
        window.addEventListener('resize', () => this.debouncedOnWindowResize.execute());
        this.currentSize = new ResponsiveWindowSize();
    }

    private readonly debouncedOnWindowResize = new DebouncedAction(
        this.onWindowResize.bind(this),
        100
    );

    private onWindowResize() {
        this.currentSize = new ResponsiveWindowSize(this.currentSize.breakpoint);
        this.eventSource.events.sizeChanged.invoke(this.currentSize);
    }
}