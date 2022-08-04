import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";

export class Heading1View extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'h1');
    }
}

export class Heading2View extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'h2');
    }
}

export class Heading3View extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'h3');
    }
}

export class Heading4View extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'h4');
    }
}

export class Heading5View extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'h5');
    }
}

export class Heading6View extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'h6');
    }
}