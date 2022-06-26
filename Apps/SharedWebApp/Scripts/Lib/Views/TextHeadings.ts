import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";

export class TextHeading1View extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'h1');
    }
}

export class TextHeading2View extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'h2');
    }
}

export class TextHeading3View extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'h3');
    }
}

export class TextHeading4View extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'h4');
    }
}

export class TextHeading5View extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'h5');
    }
}

export class TextHeading6View extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'h6');
    }
}