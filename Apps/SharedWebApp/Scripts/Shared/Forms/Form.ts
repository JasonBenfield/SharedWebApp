import { container } from "tsyringe";
import instance from "tsyringe/dist/typings/dependency-container";
import { AppApiAction } from "../AppApiAction";
import { AppApiError } from "../AppApiError";
import { ConsoleLog } from "../ConsoleLog";
import { ModalErrorComponent } from "../Error/ModalErrorComponent";
import { ErrorModel } from "../ErrorModel";
import { DateInputField } from "./DateInputField";
import { DropDownField } from "./DropDownField";
import { DropDownFieldViewModel } from "./DropDownFieldViewModel";
import { ErrorList } from "./ErrorList";
import { FieldCollection } from "./FieldCollection";
import { FormSaveResult } from "./FormSaveResult";
import { InputFieldViewModel } from "./InputFieldViewModel";
import { NumberInputField } from "./NumberInputField";
import { TextInputField } from "./TextInputField";

export class Form {
    constructor(private readonly name: string) {
        this.modalError = container.resolve(ModalErrorComponent);
        this.modalError.errorSelected.register(this.onErrorSelected.bind(this));
    }

    private async onErrorSelected(error: ErrorModel) {
        await this.modalError.okCommand.execute();
        let field: any = this.getField(error.Source);
        if (field) {
            if (field.setFocus) {
                field.setFocus();
            }
        }
    }

    private readonly fields = new FieldCollection();
    private readonly modalError: ModalErrorComponent;

    getName() { return this.name; }

    getField(name: string) {
        if (name) {
            if (this.getName() === name) {
                return this;
            }
            return this.fields.getField(name);
        }
        return null;
    }

    protected addHiddenTextField(name: string, vm: InputFieldViewModel) {
        return this.addField(TextInputField.hidden(this.name, name, vm));
    }

    protected addHiddenNumberField(name: string, vm: InputFieldViewModel) {
        return this.addField(NumberInputField.hidden(this.name, name, vm));
    }

    protected addHiddenDateField(name: string, vm: InputFieldViewModel) {
        return this.addField(DateInputField.hidden(this.name, name, vm));
    }

    protected addTextInputField(name: string, vm: InputFieldViewModel) {
        return this.addField(new TextInputField(this.name, name, vm));
    }

    protected addNumberInputField(name: string, vm: InputFieldViewModel) {
        return this.addField(new NumberInputField(this.name, name, vm));
    }

    protected addDateInputField(name: string, vm: InputFieldViewModel) {
        return this.addField(new DateInputField(this.name, name, vm));
    }

    protected addDropDownField<T>(name: string, vm: DropDownFieldViewModel) {
        return this.addField(new DropDownField<T>(this.name, name, vm));
    }

    protected addField<TField extends IField>(field: TField) {
        return this.fields.addField(field);
    }

    async save<TResult>(action: AppApiAction<any, TResult>) {
        let validationResult = this.validate();
        if (validationResult.hasErrors()) {
            let errors = validationResult.values();
            container.resolve(ModalErrorComponent).show(errors, `Unable to ${action.friendlyName}`);
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
        this.fields.validate(errors);
        return errors;
    }

    import(values: Record<string, any>) {
        this.fields.import(values);
    }

    private export() {
        let values: Record<string, any> = {};
        this.fields.export(values);
        return values;
    }
}
