import { SelectView } from "../Views/SelectView";
import { BasicComponent } from "./BasicComponent";
import { SelectOption } from "./SelectOption";
import { EventSource } from '../Events';

type Events<TValue> = { valueChanged: TValue };

export class SelectControl<TValue> extends BasicComponent {
    protected readonly view: SelectView;
    private readonly items: SelectOption<TValue>[] = [];
    private itemCaption: string;

    private readonly eventSource = new EventSource<Events<TValue>>(this, { valueChanged: null as TValue });
    readonly when = this.eventSource.when;

    constructor(view: SelectView) {
        super(view);
        this.view.onChange()
            .execute(() => this.eventSource.events.valueChanged.invoke(this.getValue()))
            .subscribe();
    }

    required() {
        this.view.required();
    }

    notRequired() {
        this.view.notRequired();
    }

    setCustomValidity(message: string) {
        this.view.setCustomValidity(message);
    }

    getValue() {
        const selectedOption = this.getSelectedOption();
        return selectedOption ? selectedOption.value : null;
    }

    getSelectedOption() {
        const selectedIndex = this.getSelectedIndex();
        return selectedIndex > -1 ? this.items[selectedIndex] : null;
    }
    
    getSelectedIndex() {
        return this.view.getSelectedIndex();
    }

    setValue(value: TValue, comparer: (x: TValue, y: TValue) => boolean = SelectControl.defaultComparer<TValue>) {
        const selectedIndex = this.items.findIndex(o => comparer(o.value, value));
        this.view.setSelectedIndex(selectedIndex);
    }

    private static defaultComparer<TValue>(x: TValue, y: TValue) {
        return x === y;
    }

    setItems(...items: SelectOption<TValue>[]) {
        const originalValue = this.getValue();
        this.items.splice(0, this.items.length, ...items);
        this.prependCaption();
        this.updateOptions();
        this.resetValue(originalValue, items);
    }

    setItemCaption(itemCaption: string, ...items: SelectOption<TValue>[]) {
        const originalValue = this.getValue();
        this.items.splice(0, this.items.length, ...items);
        if (this.itemCaption) {
            this.items.splice(0, 1);
        }
        this.itemCaption = itemCaption;
        this.prependCaption();
        this.updateOptions();
        this.resetValue(originalValue, this.items);
    }

    private resetValue(originalValue: TValue, items: SelectOption<TValue>[]) {
        if (items.find(item => item.value === originalValue)) {
            this.setValue(originalValue);
        }
        else {
            this.setValue(this.itemCaption ? null : items[0].value);
        }
    }

    private prependCaption() {
        if (this.itemCaption) {
            this.items.splice(0, 0, new SelectOption<TValue>(null, this.itemCaption));
        }
    }

    private updateOptions() {
        const options = this.view.replaceOptions(this.items.length);
        let i = 0;
        for (const item of this.items) {
            const option = options[i];
            option.setValue(item.value === null || item.value === undefined ? '' : `${item.value}`);
            option.setText(item.displayText);
            i++;
        }
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}