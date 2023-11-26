import { Awaitable } from "../Awaitable";
import { BooleanInputControl } from "../Components/BooleanInputControl";
import { Command } from "../Components/Command";
import { InputControl } from "../Components/InputControl";
import { ListGroup } from "../Components/ListGroup";
import { MessageAlert } from "../Components/MessageAlert";
import { TextComponent } from "../Components/TextComponent";
import { DateOnly } from "../DateOnly";
import { DebouncedAction } from "../DebouncedAction";
import { MultiViewValue } from "../Forms/MultiViewValue";
import { TextToDateOnlyViewValue } from "../Forms/TextToDateOnlyViewValue";
import { TextToNumberViewValue } from "../Forms/TextToNumberViewValue";
import { TextToTextViewValue } from "../Forms/TextToTextViewValue";
import { FilterColumnOptionsBuilder } from "./FilterColumnOptionsBuilder";
import { FilterMultiValueInputPanelView } from "./FilterMultiValueInputPanelView";
import { SelectedValueListItem } from "./SelectedValueListItem";
import { SelectedValueListItemView } from "./SelectedValueListItemView";
import { SuggestedValueListItem } from "./SuggestedValueListItem";
import { SuggestedValueListItemView } from "./SuggestedValueListItemView";

interface IResult {
    readonly done?: boolean;
}

class Result {
    static done() { return new Result({ done: true }); }

    private constructor(private readonly result: IResult) { }

    get done() { return this.result.done; }
}

export class FilterMultiValueInputPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly title: TextComponent;
    private options: FilterColumnOptionsBuilder;
    private readonly input: InputControl<number | string | DateOnly>;
    private readonly ignoreCaseInput: BooleanInputControl;
    private viewValue: MultiViewValue<string, number | string | DateOnly>;
    private readonly alert: MessageAlert;
    private readonly suggestedValues: ListGroup<SuggestedValueListItem, SuggestedValueListItemView>;
    private readonly selectedValues: ListGroup<SelectedValueListItem, SelectedValueListItemView>;
    private readonly addCommand: Command;
    private readonly saveCommand: Command;

    constructor(private readonly view: FilterMultiValueInputPanelView) {
        this.viewValue = new MultiViewValue(new TextToTextViewValue());
        this.ignoreCaseInput = new BooleanInputControl(view.ignoreCaseInput);
        this.input = new InputControl(view.valueInput, this.viewValue);
        this.title = new TextComponent(view.title);
        this.alert = new MessageAlert(view.alert);
        this.suggestedValues = new ListGroup(view.suggestedValues);
        this.suggestedValues.when.itemClicked.then(this.onSuggestedValueAddClicked.bind(this));
        this.selectedValues = new ListGroup(view.selectedValues);
        view.handleDeleteButton(this.onSelectedValueDeleteClicked.bind(this));
        this.saveCommand = new Command(this.save.bind(this));
        this.saveCommand.add(view.saveButton);
        view.handleFormSubmit(this.onFormSubmit.bind(this));
        this.addCommand = new Command(this.add.bind(this));
        this.addCommand.add(view.addButton);
        new Command(this.cancel.bind(this)).add(view.cancelButton);
        this.input.when.valueChanged.then(this.onInputChanged.bind(this));
        this.ignoreCaseInput.when.valueChanged.then(this.onIgnoreCaseChanged.bind(this));
    }

    private onInputChanged() {
        this.debouncedGetSuggestedValues.execute();
    }

    private onIgnoreCaseChanged() {
        this.debouncedGetSuggestedValues.execute();
    }

    private readonly debouncedGetSuggestedValues = new DebouncedAction(
        () => this.getSuggestedValues(),
        500
    );

    private async getSuggestedValues() {
        if (this.options) {
            const suggestedValues = await this.alert.infoAction(
                'Loading...',
                () => this.options.column.suggestedValueGetter.getSuggestedValues(this.input.getValue())
            );
            this.suggestedValues.setItems(
                suggestedValues as string[],
                (v, itemView) => new SuggestedValueListItem(v, v, itemView)
            );
        }
    }

    private onSuggestedValueAddClicked(item: SuggestedValueListItem) {
        this.addValue(item.value);
    }

    private onSelectedValueDeleteClicked(el: HTMLElement) {
        const item = this.selectedValues.getItemByElement(el);
        this.selectedValues.removeItem(item);
        this.options.column.suggestedValueGetter.exclude(this.getSelectedValues());
        this.updateSelectedValueVisibility();
        this.debouncedGetSuggestedValues.execute();
    }

    private updateSelectedValueVisibility() {
        if (this.selectedValues.getItems().length > 0) {
            this.view.showSelectedValues();
        }
        else {
            this.view.hideSelectedValues();
        }
    }

    private add() {
        if (!this.input.isBlank()) {
            const value = this.getInputValue();
            if (typeof value !== 'number' || !Number.isNaN(value)) {
                this.addValue(value);
                this.setInputValue('');
                this.input.setFocus();
            }
        }
    }

    private addValue(value: any) {
        this.selectedValues.addItem(
            value,
            (v, itemView: SelectedValueListItemView) =>
                new SelectedValueListItem(v, `${v}`, itemView)
        );
        this.updateSelectedValueVisibility();
        this.options.column.suggestedValueGetter.exclude(this.getSelectedValues());
        this.debouncedGetSuggestedValues.execute();
    }

    private getInputValue() {
        return this.input.getValue();
    }

    private save() {
        const values = this.getSelectedValues();
        if (values.length > 0) {
            const values = this.getSelectedValues();
            if (this.options.column.sourceType.isString()) {
                this.options.setStringValues(values, this.ignoreCaseInput.getValue());
            }
            else {
                this.options.setValues(values);
            }
            this.awaitable.resolve(Result.done());
        }
    }

    private getSelectedValues() {
        const values: any[] = [];
        const items = this.selectedValues.getItems();
        for (const item of items) {
            values.push(item.value);
        }
        return values;
    }

    private onFormSubmit(_: HTMLElement, evt: JQuery.Event) {
        evt.preventDefault();
        this.addCommand.execute();
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
        this.selectedValues.clearItems();
        this.updateSelectedValueVisibility();
        this.setInputValue('');
        this.view.ignoreCaseInput.setValue(true);
        this.options.column.suggestedValueGetter.exclude([]);
        this.options.column.suggestedValueGetter.setIgnoreCase(this.ignoreCaseInput.getValue());
        this.debouncedGetSuggestedValues.execute();
    }

    updateTitle() {
        const columnText = this.options && this.options.column && this.options.column.displayText;
        const condition = this.options && this.options.getSelection();
        const conditionText = condition && condition.displayText;
        this.title.setText(`${columnText} ${conditionText}`);
    }

    private setInputValue(value: string) {
        this.input.setValue(value);
    }

    start() {
        this.view.valueInput.setFocus();
        return this.awaitable.start();
    }

    activate() { this.view.show(); }

    deactivate() { this.view.hide(); }
}