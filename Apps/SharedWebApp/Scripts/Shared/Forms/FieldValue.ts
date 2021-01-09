import { ColumnCss } from "../ColumnCss";
import { CssClass } from "../CssClass";
import { FieldViewValue } from "./FieldViewValue";

export class FieldValue {
    constructor(
        prefix: string,
        name: string,
        private readonly vm: IFieldValueViewModel,
        private readonly fieldValue: FieldViewValue
    ) {
        this.name = prefix ? `${prefix}_${name}` : name;
        this.vm.name(this.name);
        this.changed.register(this.onValueChanged.bind(this));
    }

    readonly changed = this.vm.changed;

    private onValueChanged(updatedValue: any) {
        this.fieldValue.setValueFromView(updatedValue);
    }

    private name: string;

    getName() { return this.name; }

    getValue() {
        return this.fieldValue.getValue();
    }

    setValue(value: any) {
        this.fieldValue.setValue(value);
        let currentViewValue = this.vm.value();
        let updatedViewValue = this.fieldValue.toView();
        if (currentViewValue !== updatedViewValue) {
            this.vm.value(updatedViewValue);
        }
    }

    setColumns(columns: ColumnCss) {
        let css = new CssClass('');
        if (columns) {
            css.addName(columns.toString());
        }
        this.vm.css(css.toString());
    }

    show() {
        this.vm.isVisible(true);
    }

    hide() {
        this.vm.isVisible(false);
    }

    enable() {
        this.vm.isEnabled(true);
    }

    disable() {
        this.vm.isEnabled(false);
    }
}
