import { TypedFieldViewValue } from "../Forms/TypedFieldViewValue";
import { DataListView } from "../Views/DataListView";
import { BasicComponent } from "./BasicComponent";
import { ComponentID } from "./ComponentID";
import { DataListOption } from "./DataListOption";
import { DataListOptionComponent } from "./DataListOptionComponent";

export class DataListComponent<TValue> extends BasicComponent {
    constructor(protected readonly view: DataListView, private readonly viewValue: TypedFieldViewValue<string, TValue>) {
        super(view);
        view.setViewID(ComponentID.nextID());
    }

    get options() { return this.getComponents().map(c => c.option); }

    protected getComponents: () => DataListOptionComponent<TValue>[];

    setOptions(...values: TValue[]) {
        const options = values.map(v => new DataListOption(v, this.viewValue.toView(v)));
        this._setOptions(options);
    }

    private _setOptions(options: DataListOption<TValue>[]) {
        for (const item of this.getComponents()) {
            item.dispose();
        }
        const optionViews = this.view.addOptions(options.length);
        let i = 0;
        for (const option of options) {
            const optionView = optionViews[i];
            this.addComponent(new DataListOptionComponent(option, optionView));
            i++;
        }
    }

}