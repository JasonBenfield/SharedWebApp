import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { IOptionAttributes } from "./Types";

export class SelectView extends BasicComponentView {
    protected readonly selectElement: HTMLSelectElement;

    constructor(container: BasicComponentView) {
        super(container, 'select');
        this.selectElement = this.elementView.element as HTMLSelectElement;
    }

    styleAsFormControl() {
        this.addCssName('form-control');
    }

    options() { return this.getViews() as SelectOptionView[]; }

    getSelectedIndex() { return this.selectElement.selectedIndex; }

    setSelectedIndex(selectedIndex: number) {
        return this.selectElement.selectedIndex = selectedIndex;
    }

    getValue() {
        return this.selectElement.value;
    }

    setValue(value: string) {
        this.selectElement.value = value;
    }

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

    replaceOptions(howMany?: number) {
        this.disposeAllViews();
        return this.addOptions(howMany);
    }

    onChange() { return this.on('change'); }
}

export class SelectOptionView extends BasicTextComponentView {

    constructor(container: BasicComponentView) {
        super(container, 'option');
    }

    protected setAttr: (config: (attr: IOptionAttributes) => void) => void;

    setValue(value: string) {
        this.setAttr(a => a.value = value);
    }
}