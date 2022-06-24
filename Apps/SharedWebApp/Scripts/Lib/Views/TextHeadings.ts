import { BasicTextComponentView } from "./BasicTextComponentView";
import { HtmlElementView } from "./HtmlElementView";
import { IContainerView } from "./Types";

export class TextHeading1View extends BasicTextComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'h1'));
    }
}

export class TextHeading2View extends BasicTextComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'h2'));
    }
}

export class TextHeading3View extends BasicTextComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'h3'));
    }
}

export class TextHeading4View extends BasicTextComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'h4'));
    }
}

export class TextHeading5View extends BasicTextComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'h5'));
    }
}

export class TextHeading6View extends BasicTextComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'h6'));
    }
}