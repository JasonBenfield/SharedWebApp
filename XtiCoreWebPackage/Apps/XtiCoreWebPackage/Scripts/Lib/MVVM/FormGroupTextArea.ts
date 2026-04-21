import { FormControlCss } from "../Bootstrap/FormGroupCss";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseFormGroupView, FormGroup, FormGroupView, FormGroupViewModel, IFormGroupViewModel } from "./FormGroup";
import { BaseTextAreaComponentView, BaseTextAreaComponentViewModel, TextAreaComponent, TextAreaComponentView, TextAreaComponentViewModel } from "./TextAreaComponent";

export class FormGroupTextAreaViewModel extends FormGroupViewModel<TextAreaComponentViewModel> {
    constructor() {
        super(new TextAreaComponentViewModel());
    }
}

export class FormGroupTextAreaView extends FormGroupView<TextAreaComponentView> {
    constructor() {
        super(new TextAreaComponentView());
        this.publicLayout.value.setCss(FormControlCss.control());
    }
}

export class FormGroupTextArea extends FormGroup<BaseTextAreaComponentViewModel, BaseTextAreaComponentView, TextAreaComponent> {
    constructor(viewModel: ComponentViewModel & IFormGroupViewModel<BaseTextAreaComponentViewModel>, view: BaseFormGroupView<BaseTextAreaComponentView>) {
        super(viewModel, view, (vm, v) => new TextAreaComponent(vm, v));
    }

    readonly when = this.value.when;

    getValue() {
        return this.value.textValue;
    }

    setValue(value: string) {
        this.value.textValue = value;
    }

    setNumberOfColumns(numberOfColumns: number) { this.value.numberOfColumns = numberOfColumns; }

    setNumberOfRows(numberOfRows: number) { this.value.numberOfRows = numberOfRows; }
}
