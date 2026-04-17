import { FormControlCss } from "../Bootstrap/FormGroupCss";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseFormGroupView, FormGroup, FormGroupView, FormGroupViewModel, IFormGroupViewModel } from "./FormGroup";
import { IOptionComponentUpdater } from "./OptionComponent";
import { BaseSelectComponentView, BaseSelectComponentViewModel, SelectComponent, SelectComponentView, SelectComponentViewModel } from "./SelectComponent";

export class FormGroupSelectViewModel<TValue> extends FormGroupViewModel<SelectComponentViewModel<TValue>> {
    constructor() {
        super(new SelectComponentViewModel());
    }
}

export class FormGroupSelectView extends FormGroupView<SelectComponentView> {
    constructor() {
        super(new SelectComponentView());
        this.publicLayout.value.setCss(this.formControlCss);
    }

    private readonly formControlCss = FormControlCss.select();

    setFormControlCss(configure: (css: FormControlCss) => void) {
        configure(this.formControlCss);
        this.publicLayout.value.setCss(this.formControlCss);
        return this;
    }
}

export class FormGroupSelect<TValue> extends FormGroup<BaseSelectComponentViewModel<TValue>, BaseSelectComponentView, SelectComponent<TValue>> {
    constructor(
        viewModel: ComponentViewModel & IFormGroupViewModel<BaseSelectComponentViewModel<TValue>>,
        view: BaseFormGroupView<BaseSelectComponentView>,
        valueWhenNull: TValue,
        itemUpdater?: IOptionComponentUpdater<TValue>
    ) {
        super(viewModel, view, (vm, v) => new SelectComponent(vm, v, valueWhenNull, itemUpdater));
    }

    readonly when = this.value.when;

    getValue() {
        return this.value.value;
    }

    setValue(value: TValue) {
        this.value.setValue(value);
    }

    getItems() { return this.value.getItems(); }

    addItem(sourceItem: TValue) { this.value.addItem(sourceItem); }

    addItems(...sourceItems: TValue[]) { this.value.addItems(...sourceItems); }

    insertItem(index: number, sourceItem: TValue) { this.value.insertItem(index, sourceItem); }

    insertItems(index: number, ...sourceItems: TValue[]) { this.value.insertItems(index, ...sourceItems); }

    removeAllItems() { this.value.removeAllItems(); }

    setItems(...sourceItems: TValue[]) { this.value.setItems(...sourceItems); }

    addOrUpdateItems(...sourceItems: TValue[]) { this.value.addOrUpdateItems(...sourceItems); }
}
