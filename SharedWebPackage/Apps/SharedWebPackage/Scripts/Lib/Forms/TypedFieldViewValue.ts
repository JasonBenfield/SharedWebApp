import { FieldViewValue } from "./FieldViewValue";

export class TypedFieldViewValue<TView, TActual> extends FieldViewValue {
    declare getValue: () => TActual | null;

    declare setValue: (value: TActual | null) => void;

    declare setValueFromView: (value: TView) => TActual | null;
}