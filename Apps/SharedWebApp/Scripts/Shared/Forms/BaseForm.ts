import { AppApiAction } from "../AppApiAction";
import { AppApiError } from "../AppApiError";
import { ConsoleLog } from "../ConsoleLog";
import { ModalErrorComponent } from "../Error/ModalErrorComponent";
import { ErrorModel } from "../ErrorModel";
import { BaseFormView } from "./BaseFormView";
import { ComplexFieldLayout } from "./ComplexFieldLayout";
import { ErrorList } from "./ErrorList";
import { FormGroupCollection } from "./FormGroupCollection";
import { FormSaveResult } from "./FormSaveResult";

export class BaseForm {
    private layout = new ComplexFieldLayout(this);
    private readonly formGroups: FormGroupCollection;
    private readonly modalError: ModalErrorComponent;

    constructor(
        private readonly name: string,
        private readonly view: BaseFormView
    ) {
        this.formGroups = new FormGroupCollection(name, this.view.formGroups);
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

    useLayout(layout: ComplexFieldLayout) {
        this.layout = layout;
    }

    executeLayout() {
        this.layout.execute();
        this.formGroups.executeLayout();
    }

    forEachFormGroup(action: (field: IFormGroupField) => void) {
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

    protected addHiddenTextFormGroup(name: string) {
        return this.formGroups.addHiddenTextFormGroup(name);
    }

    protected addHiddenNumberFormGroup(name: string) {
        return this.formGroups.addHiddenNumberFormGroup(name);
    }

    protected addHiddenDateFormGroup(name: string) {
        return this.formGroups.addHiddenDateFormGroup(name);
    }

    protected addTextInputFormGroup(name: string) {
        return this.formGroups.addTextInputFormGroup(name);
    }

    protected addNumberInputFormGroup(name: string) {
        return this.formGroups.addNumberInputFormGroup(name);
    }

    protected addDateInputFormGroup(name: string) {
        return this.formGroups.addDateInputFormGroup(name);
    }

    protected addTextDropDownFormGroup(name: string) {
        return this.formGroups.addTextDropDownFormGroup(name);
    }

    protected addNumberDropDownFormGroup(name: string) {
        return this.formGroups.addNumberDropDownFormGroup(name);
    }

    protected addDateDropDownFormGroup(name: string) {
        return this.formGroups.addDateDropDownFormGroup(name);
    }

    protected addBooleanDropDownFormGroup(name: string) {
        return this.formGroups.addBooleanDropDownFormGroup(name);
    }

    protected addDropDownFormGroup<T>(name: string) {
        return this.formGroups.addDropDownFormGroup<T>(name);
    }

    protected addFormGroup<TField extends IFormGroupField>(formGroup: TField) {
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
        return new FormSaveResult(result, errors);
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
