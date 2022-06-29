import { Awaitable } from "../Awaitable";
import { Command } from "../Components/Command";
import { TextComponent } from "../Components/TextComponent";
import { DelayedAction } from "../DelayedAction";
import { FieldViewValue } from "../Forms/FieldViewValue";
import { TextToDateViewValue } from "../Forms/TextToDateViewValue";
import { TextToNumberViewValue } from "../Forms/TextToNumberViewValue";
import { TextToTextViewValue } from "../Forms/TextToTextViewValue";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterValueInputPanelView } from "./FilterValueInputPanelView";

interface IResult {
    readonly done?: {};
}

class Result {
    static done() { return new Result({ done: {} }); }

    private constructor(private readonly result: IResult) { }

    get done() { return this.result.done; }
}

export class FilterValueInputPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly title: TextComponent;
    private readonly operation: TextComponent;
    private options: FilterColumnOptionsBuilder;
    private viewValue: FieldViewValue = new TextToTextViewValue();

    constructor(private readonly view: FilterValueInputPanelView) {
        this.title = new TextComponent(this.view.title);
        this.operation = new TextComponent(this.view.operation);
        const saveCommand = new Command(this.save.bind(this));
        saveCommand.add(view.saveButton);
        view.form.onSubmit().preventDefault().execute(() => saveCommand.execute()).subscribe();
        view.valueInput.onBlur().execute(this.onBlur.bind(this)).subscribe();
        new Command(this.cancel.bind(this)).add(view.cancelButton);
    }

    private cancel() { this.awaitable.resolve(Result.done()); }

    private onBlur() {
        const rawValue = this.view.valueInput.getValue();
        this.viewValue.setValueFromView(rawValue);
        this.view.valueInput.setValue(this.viewValue.getValue());
    }

    private save() {
        const rawValue = this.view.valueInput.getValue();
        if (rawValue) {
            const value = this.getValue();
            if (typeof value !== 'number' || !Number.isNaN(value)) {
                if (this.options.column.sourceType.isString()) {
                    this.options.setStringValue(value, this.view.ignoreCaseInput.getValue());
                }
                else {
                    this.options.setValue(value);
                }
                this.options.applyToQuery();
                this.awaitable.resolve(Result.done());
            }
        }
    }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        this.title.setText('Filter');
        if (options.column.sourceType.isString()) {
            this.view.showIgnoreCase();
        }
        else {
            this.view.hideIgnoreCase();
        }
        if (options.column.sourceType.isNumber()) {
            this.viewValue = new TextToNumberViewValue();
            this.view.valueInput.setType('text');
        }
        else if (options.column.sourceType.isDate()) {
            this.viewValue = new TextToDateViewValue();
            this.view.valueInput.setType('date');
        }
        else {
            this.viewValue = new TextToTextViewValue();
            this.view.valueInput.setType('text');
        }
        this.setValue('');
        this.view.ignoreCaseInput.setValue(true);
    }

    private getValue() {
        const rawValue = this.view.valueInput.getValue();
        this.viewValue.setValueFromView(rawValue);
        return this.viewValue.getValue();
    }

    private setValue(value: string) {
        this.viewValue.setValue(value);
        this.view.valueInput.setValue(this.viewValue.getValue());
    }

    start() {
        new DelayedAction(
            () => {
                this.view.valueInput.setFocus();
                this.operation.setText(`${this.options.column.columnName} ${this.options.getSelection().displayText}`);
            },
            700
        ).execute();
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}