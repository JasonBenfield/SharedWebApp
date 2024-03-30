import { BasicComponentView } from "./BasicComponentView";
import { DataListOptionView } from "./DataListOptionView";

export class DataListView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'datalist');
    }

    addOption() {
        return this.addOptions(1)[0];
    }

    addOptions(howMany?: number) {
        const options: DataListOptionView[] = [];
        for (let i = 0; i < howMany; i++) {
            const option = this.addView(DataListOptionView);
            options.push(option);
        }
        return options;
    }

    replaceOptions(howMany?: number) {
        this.disposeAllViews();
        return this.addOptions(howMany);
    }

}