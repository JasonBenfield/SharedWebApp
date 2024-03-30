import { AppClientAction } from "../Http/AppClientAction";
import { AppClientError } from "../Http/AppClientError";
import { ConsoleLog } from "../ConsoleLog";
import { ModalError } from "../Components/ModalError";
import { ErrorModel } from "../ErrorModel";
import { BaseFormView } from "../Views/BaseFormView";
import { SimpleFieldFormGroupDateTimeInputView, SimpleFieldFormGroupSelectView, SimpleFieldFormGroupTimeSpanInputView } from "../Views/FormGroup";
import { ErrorList } from "./ErrorList";
import { FormGroupCollection } from "./FormGroupCollection";
import { FormSaveResult } from "./FormSaveResult";
import { SimpleFieldFormGroupInputView } from "../Views/FormGroup";
import { InputView } from "../Views/InputView";

export class BaseForm {
    private readonly formGroups: FormGroupCollection;
    private readonly modalError: ModalError;

    constructor(private readonly name: string, protected readonly view: BaseFormView) {
        this.formGroups = new FormGroupCollection(name);
        this.modalError = new ModalError(this.view.modalError);
        this.modalError.when.errorSelected.then(this.onErrorSelected.bind(this));
    }

    handleSubmit(action: (el: HTMLElement, evt: JQuery.Event) => void) {
        this.view.handleSubmit(action);
    }

    private async onErrorSelected(error: ErrorModel) {
        this.modalError.hide();
        const field: any = this.getField(error.Source);
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

    protected addHiddenText(name: string, view: InputView) {
        return this.formGroups.addHiddenText(name, view);
    }

    protected addHiddenNumber(name: string, view: InputView) {
        return this.formGroups.addHiddenNumber(name, view);
    }

    protected addHiddenDate(name: string, view: InputView) {
        return this.formGroups.addHiddenDate(name, view);
    }

    protected addHiddenDateTime(name: string, view: InputView) {
        return this.formGroups.addHiddenDateTime(name, view);
    }

    protected addHiddenTime(name: string, view: InputView) {
        return this.formGroups.addHiddenTime(name, view);
    }

    protected addHiddenTimeSpan(name: string, view: InputView) {
        return this.formGroups.addHiddenTimeSpan(name, view);
    }

    protected addTextInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.formGroups.addTextInputFormGroup(name, view);
    }

    protected addNumberInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.formGroups.addNumberInputFormGroup(name, view);
    }

    protected addDateInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.formGroups.addDateInputFormGroup(name, view);
    }

    protected addDateTimeInputFormGroup(name: string, view: SimpleFieldFormGroupDateTimeInputView) {
        return this.formGroups.addDateTimeInputFormGroup(name, view);
    }

    protected addTimeInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.formGroups.addTimeInputFormGroup(name, view);
    }

    protected addTimeSpanInputFormGroup(name: string, view: SimpleFieldFormGroupTimeSpanInputView) {
        return this.formGroups.addTimeSpanInputFormGroup(name, view);
    }

    protected addTextDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addTextDropDownFormGroup(name, view);
    }

    protected addNumberDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addNumberDropDownFormGroup(name, view);
    }

    protected addDateDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addDateDropDownFormGroup(name, view);
    }

    protected addDateTimeDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addDateTimeDropDownFormGroup(name, view);
    }

    protected addTimeDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addTimeDropDownFormGroup(name, view);
    }

    protected addTimeSpanDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addTimeSpanDropDownFormGroup(name, view);
    }

    protected addBooleanDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addBooleanDropDownFormGroup(name, view);
    }

    protected addDropDownFormGroup<T>(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addDropDownFormGroup<T>(name, view);
    }

    protected addFormGroup<TField extends IField>(formGroup: TField) {
        return this.formGroups.addField(formGroup);
    }

    async save<TResult>(action: AppClientAction<any, TResult>) {
        const validationResult = this.validate();
        this.view.addCssName('was-validated');
        if (validationResult.hasErrors()) {
            const errors = validationResult.values();
            this.modalError.show(errors, `Unable to ${action.friendlyName}`);
            return new FormSaveResult<TResult>(null, errors);
        }
        let result: TResult;
        const errors: IErrorModel[] = [];
        try {
            const model = this.export();
            result = await action.execute(model, { preventDefault: true });
        }
        catch (ex) {
            let caption = '';
            if (ex instanceof AppClientError) {
                errors.push(...ex.getErrors());
                caption = ex.getCaption();
            }
            else {
                const error = new ErrorModel(ex.message, '', '');
                errors.push(error);
                new ConsoleLog().error(ex.message);
            }
            this.modalError.show(errors, caption);
        }
        return new FormSaveResult<TResult>(result, errors);
    }

    private validate() {
        const errors = new ErrorList();
        this.formGroups.validate(errors);
        return errors;
    }

    import(values: Record<string, any>) {
        this.formGroups.import(values);
    }

    private export() {
        const values: Record<string, any> = {};
        this.formGroups.export(values);
        return values;
    }

    submit() {
        this.view.submit();
    }
}
