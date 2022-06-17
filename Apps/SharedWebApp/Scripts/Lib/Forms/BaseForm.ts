import { AppApiAction } from "../Api/AppApiAction";
import { AppApiError } from "../Api/AppApiError";
import { ConsoleLog } from "../ConsoleLog";
import { ModalErrorComponent } from "../Error/ModalErrorComponent";
import { ErrorModel } from "../ErrorModel";
import { BaseFormView } from "./BaseFormView";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { ErrorList } from "./ErrorList";
import { FormGroupCollection } from "./FormGroupCollection";
import { FormSaveResult } from "./FormSaveResult";
import { InputFormGroupView } from "./InputFormGroupView";

export class BaseForm {
    private readonly formGroups: FormGroupCollection;
    private readonly modalError: ModalErrorComponent;

    constructor(
        private readonly name: string,
        protected readonly view: BaseFormView
    ) {
        this.formGroups = new FormGroupCollection(name);
        this.modalError = new ModalErrorComponent(this.view.modalError);
        this.modalError.errorSelected.register(this.onErrorSelected.bind(this));
    }

    private async onErrorSelected(error: ErrorModel) {
        this.modalError.hide();
        let field: any = this.getField(error.Source);
        if (field) {
            if (field.setFocus) {
                field.setFocus();
            }
        }
    }

    forEachFormGroup(action: (field: IField) => void) {
        this.formGroups.forEach(action);
    }

    getName() { return this.name; }

    getField(name: string) {
        if (name) {
            if (this.getName() === name) {
                return this;
            }
            return this.formGroups.getField(name);
        }
        return null;
    }

    protected addHiddenTextFormGroup(name: string, view: InputFormGroupView) {
        return this.formGroups.addHiddenTextFormGroup(name, view);
    }

    protected addHiddenNumberFormGroup(name: string, view: InputFormGroupView) {
        return this.formGroups.addHiddenNumberFormGroup(name, view);
    }

    protected addHiddenDateFormGroup(name: string, view: InputFormGroupView) {
        return this.formGroups.addHiddenDateFormGroup(name, view);
    }

    protected addTextInputFormGroup(name: string, view: InputFormGroupView) {
        return this.formGroups.addTextInputFormGroup(name, view);
    }

    protected addNumberInputFormGroup(name: string, view: InputFormGroupView) {
        return this.formGroups.addNumberInputFormGroup(name, view);
    }

    protected addDateInputFormGroup(name: string, view: InputFormGroupView) {
        return this.formGroups.addDateInputFormGroup(name, view);
    }

    protected addTextDropDownFormGroup(name: string, view: DropDownFormGroupView<string>) {
        return this.formGroups.addTextDropDownFormGroup(name, view);
    }

    protected addNumberDropDownFormGroup(name: string, view: DropDownFormGroupView<number>) {
        return this.formGroups.addNumberDropDownFormGroup(name, view);
    }

    protected addDateDropDownFormGroup(name: string, view: DropDownFormGroupView<Date>) {
        return this.formGroups.addDateDropDownFormGroup(name, view);
    }

    protected addBooleanDropDownFormGroup(name: string, view: DropDownFormGroupView<boolean>) {
        return this.formGroups.addBooleanDropDownFormGroup(name, view);
    }

    protected addDropDownFormGroup<T>(name: string, view: DropDownFormGroupView<T>) {
        return this.formGroups.addDropDownFormGroup<T>(name, view);
    }

    protected addFormGroup<TField extends IField>(formGroup: TField) {
        return this.formGroups.addFormGroup(formGroup);
    }

    async save<TResult>(action: AppApiAction<any, TResult>) {
        let validationResult = this.validate();
        if (validationResult.hasErrors()) {
            let errors = validationResult.values();
            this.modalError.show(errors, `Unable to ${action.friendlyName}`);
            return new FormSaveResult(null, errors);
        }
        let result: TResult;
        let errors: IErrorModel[] = [];
        try {
            let model = this.export();
            result = await action.execute(model, { preventDefault: true });
        }
        catch (ex) {
            let caption = '';
            if (ex instanceof AppApiError) {
                errors.push(...ex.getErrors());
                caption = ex.getCaption();
            }
            else {
                let error = new ErrorModel(ex.message, '', '');
                errors.push(error);
                new ConsoleLog().error(ex.message);
            }
            this.modalError.show(errors, caption);
        }
        return new FormSaveResult<TResult>(result, errors);
    }

    private validate() {
        let errors = new ErrorList();
        this.formGroups.validate(errors);
        return errors;
    }

    import(values: Record<string, any>) {
        this.formGroups.import(values);
    }

    private export() {
        let values: Record<string, any> = {};
        this.formGroups.export(values);
        return values;
    }
}
