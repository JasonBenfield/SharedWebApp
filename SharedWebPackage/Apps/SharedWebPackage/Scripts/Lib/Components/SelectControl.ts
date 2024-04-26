import { SelectView } from "../Views/SelectView";
import { BasicComponent } from "./BasicComponent";
import { SelectOption } from "./SelectOption";
import { EventSource } from '../Events';
import { SelectOptionComponent } from "./SelectOptionComponent";

type Events<TValue> = { valueChanged: TValue };

export class SelectControl<TValue> extends BasicComponent {
    protected readonly view: SelectView;
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
        return selectedIndex > -1 ? this.options[selectedIndex] : null;
    }

    get options() { return this.getComponents().map(c => c.option); }

    protected getComponents: () => SelectOptionComponent<TValue>[];

    getSelectedIndex() {
        return this.view.getSelectedIndex();
    }

    setValue(value: TValue, comparer: (x: TValue, y: TValue) => boolean = SelectControl.defaultComparer<TValue>) {
        const selectedIndex = this.options.findIndex(o => comparer(o.value, value));
        this.view.setSelectedIndex(selectedIndex);
    }

    private static defaultComparer<TValue>(x: TValue, y: TValue) {
        return x === y;
    }

    setItems(items: SelectOption<TValue>[]);
    setItems(caption: string, items: SelectOption<TValue>[]);
    setItems(captionOrOptions: string | SelectOption<TValue>[], items?: SelectOption<TValue>[]) {
        const originalValue = this.getValue();
        if (typeof captionOrOptions === 'string') {
            this.prependCaption(captionOrOptions, items);
            this.updateOptions(items);
            this.resetValue(originalValue, items);
            this.itemCaption = captionOrOptions;
        }
        else {
            this.prependCaption(this.itemCaption, captionOrOptions);
            this.updateOptions(captionOrOptions);
            this.resetValue(originalValue, captionOrOptions);
        }
    }
    
    setItemCaption(itemCaption: string) {
        const originalValue = this.getValue();
        const options = this.itemCaption ? this.options.slice(1) : this.options;
        this.prependCaption(itemCaption, options);
        this.updateOptions(options);
        this.resetValue(originalValue, options);
        this.itemCaption = itemCaption;
    }

    private resetValue(originalValue: TValue, options: SelectOption<TValue>[]) {
        if (options.find(item => item.value === originalValue)) {
            this.setValue(originalValue);
        }
        else {
            let defaultValue: TValue = null;
            if (!this.itemCaption && options.length > 0) {
                defaultValue = options[0].value;
            }
            this.setValue(defaultValue);
        }
    }

    private prependCaption(itemCaption: string, options: SelectOption<TValue>[]) {
        if (itemCaption) {
            options.splice(0, 0, new SelectOption<TValue>(null, this.itemCaption));
        }
    }

    private updateOptions(options: SelectOption<TValue>[]) {
        this.clearComponents();
        const optionViews = this.view.addOptions(options.length);
        let i = 0;
        for (const option of options) {
            const optionView = optionViews[i];
            this.addComponent(new SelectOptionComponent(option, optionView));
            i++;
        }
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}