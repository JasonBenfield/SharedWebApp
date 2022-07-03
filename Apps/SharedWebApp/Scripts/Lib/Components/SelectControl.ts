import { SelectView } from "../Views/SelectView";
import { BasicComponent } from "./BasicComponent";
import { SelectOption } from "./SelectOption";
import { EventSource } from '../Events';

export class SelectControl<TValue> extends BasicComponent {
    protected readonly view: SelectView;
    private readonly items: SelectOption<TValue>[] = [];
    private itemCaption: string;

    private readonly events = { valueChanged: null as TValue };
    private readonly eventSource = new EventSource<typeof this.events>(this, this.events);
    readonly when = this.eventSource.when;

    constructor(view: SelectView) {
        super(view);
        this.view.onChange()
            .execute(() => this.eventSource.events.valueChanged.invoke(this.getValue()))
            .subscribe();
    }

    getValue() {
        const selectedIndex = this.view.getSelectedIndex();
        return selectedIndex > -1 ? this.items[selectedIndex].value : null;
    }

    setValue(value: TValue) {
        const selectedIndex = this.items.findIndex(o => o.value === value);
        this.view.setSelectedIndex(selectedIndex);
    }

    setItems(...items: SelectOption<TValue>[]) {
        this.items.splice(0, this.items.length, ...items);
        this.prependCaption();
        this.updateOptions();
    }

    setItemCaption(itemCaption: string) {
        if (this.itemCaption) {
            this.items.splice(0, 1);
        }
        this.itemCaption = itemCaption;
        this.prependCaption();
        this.updateOptions();
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
            options[i].setText(item.displayText);
            i++;
        }
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}