import { FieldViewValue } from "./FieldViewValue";

export class TypedFieldViewValue<TView, TActual> extends FieldViewValue {
    getValue: () => TActual;

    setValue: (value: TActual) => void;

    setValueFromView: (value: TView) => TActual;
}