import { FieldViewValue } from "./FieldViewValue";

export class TypedFieldViewValue<TView, TActual> extends FieldViewValue {
    getValue() {
        return <TActual>super.getValue();
    }

    setValue(value: TActual) {
        super.setValue(value);
    }

    setValueFromView(value: TView) {
        super.setValueFromView(value);
    }
}