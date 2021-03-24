import { HtmlComponent } from "./HtmlComponent";
import { ContextualClass } from "../ContextualClass";
import { SelectViewModel } from "./SelectViewModel";
import { SelectOption } from "./SelectOption";
import { DefaultEvent } from "../Events";

export class Select<T> extends HtmlComponent {
    constructor(vm: SelectViewModel = new SelectViewModel()) {
        super(vm);
        vm.value.subscribe(this.onChange.bind(this));
    }

    private onChange(value: T) {
        this._changed.invoke(value);
    }

    private readonly _changed = new DefaultEvent<T>(this);
    readonly changed = this._changed.handler();

    protected readonly vm: SelectViewModel;

    enable() { this.vm.isEnabled(true); }

    disable() { this.vm.isEnabled(false); }

    private border = ContextualClass.default;

    setBorder(border: ContextualClass) {
        let borderCss = this.getBorderCss(border);
        this.replaceCssName(this.getBorderCss(this.border), borderCss);
        this.border = border;
    }

    private getBorderCss(border: ContextualClass) {
        return border === ContextualClass.default ? '' : border.append('border');
    }

    setItemCaption(itemCaption: string) {
        this.vm.itemsCaption(itemCaption);
    }

    setItems(items: SelectOption<T>[]) {
        this.vm.items(items);
    }

    getValue() { return <T>this.vm.value(); }

    setValue(value: T) {
        this.vm.value(value);
    }
}