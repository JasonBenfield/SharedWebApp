import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { HtmlElementView } from "./HtmlElementView";
import { IContainerView, IOptionAttributes } from "./Types";

export class SelectView extends BasicComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'select'));
    }

    options() { return this.getViews() as SelectOptionView[]; }

    addOption() {
        return this.addOptions(1)[0];
    }

    addOptions(howMany?: number) {
        const options: SelectOptionView[] = [];
        for (let i = 0; i < howMany; i++) {
            const option = this.addView(SelectOptionView);
            options.push(option);
        }
        return options;
    }
}

export class SelectOptionView extends BasicTextComponentView {

    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'option'));
    }

    protected setAttr: (config: (attr: IOptionAttributes) => void) => void;

    setValue(value: string) {
        this.setAttr(a=>a.value = value);
    }
}