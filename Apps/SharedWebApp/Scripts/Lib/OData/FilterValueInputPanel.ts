import { Awaitable } from "../Awaitable";
import { Command } from "../Components/Command";
import { InputControl } from "../Components/InputControl";
import { TextComponent } from "../Components/TextComponent";
import { DateOnly } from "../DateOnly";
import { DelayedAction } from "../DelayedAction";
import { MultiViewValue } from "../Forms/MultiViewValue";
import { TextToDateOnlyViewValue } from "../Forms/TextToDateOnlyViewValue";
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
    private readonly input: InputControl<number | string | DateOnly>;
    private viewValue: MultiViewValue<string, number | string | DateOnly>;
    private readonly saveCommand: Command;

    constructor(private readonly view: FilterValueInputPanelView) {
        this.viewValue = new MultiViewValue(new TextToTextViewValue());
        this.input = new InputControl(view.valueInput, this.viewValue);
        this.title = new TextComponent(this.view.title);
        this.operation = new TextComponent(this.view.operation);
        this.saveCommand = new Command(this.save.bind(this));
        this.saveCommand.add(view.saveButton);
        view.form
            .onSubmit()
            .execute(this.onFormSubmit.bind(this))
            .subscribe();
        new Command(this.cancel.bind(this)).add(view.cancelButton);
    }

    private save() {
        if (!this.input.isBlank()) {
            const value = this.getValue();
            if (typeof value !== 'number' || !Number.isNaN(value)) {
                if (typeof value === 'string') {
                    this.options.setStringValue(value, this.view.ignoreCaseInput.getValue());
                }
                else {
                    this.options.setValue(value);
                }
                this.awaitable.resolve(Result.done());
            }
        }
    }

    private onFormSubmit(_: HTMLElement, evt: JQuery.Event) {
        evt.preventDefault();
        this.saveCommand.execute();
    }

    private cancel() { this.awaitable.resolve(Result.done()); }

    setOptions(options: FilterColumnOptionsBuilder) {
        this.options = options;
        if (options.column.sourceType.isString()) {
            this.view.showIgnoreCase();
        }
        else {
            this.view.hideIgnoreCase();
        }
        if (options.column.sourceType.isNumber()) {
            this.viewValue.setViewValue(new TextToNumberViewValue());
            this.view.valueInput.setType('text');
        }
        else if (options.column.sourceType.isDate()) {
            this.viewValue.setViewValue(new TextToDateOnlyViewValue());
            this.view.valueInput.setType('date');
        }
        else {
            this.viewValue.setViewValue(new TextToTextViewValue());
            this.view.valueInput.setType('text');
        }
        this.setValue('');
        this.view.ignoreCaseInput.setValue(true);
    }

    updateTitle() {
        const columnText = this.options && this.options.column && this.options.column.displayText;
        const condition = this.options && this.options.getSelection();
        const conditionText = condition && condition.displayText;
        this.title.setText(`${columnText} ${conditionText}`);
    }

    private getValue() {
        return this.input.getValue();
    }

    private setValue(value: string) {
        this.input.setValue(value);
    }

    start() {
        this.view.valueInput.setFocus();
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}