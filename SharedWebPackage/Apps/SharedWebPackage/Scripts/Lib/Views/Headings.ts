import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";

export class Heading1View extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'h1');
    }

    scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
        this.elementView.scrollIntoView(arg);
    }
}

export class Heading2View extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'h2');
    }

    scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
        this.elementView.scrollIntoView(arg);
    }
}

export class Heading3View extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'h3');
    }

    scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
        this.elementView.scrollIntoView(arg);
    }
}

export class Heading4View extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'h4');
    }

    scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
        this.elementView.scrollIntoView(arg);
    }
}

export class Heading5View extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'h5');
    }

    scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
        this.elementView.scrollIntoView(arg);
    }
}

export class Heading6View extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'h6');
    }

    scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
        this.elementView.scrollIntoView(arg);
    }
}