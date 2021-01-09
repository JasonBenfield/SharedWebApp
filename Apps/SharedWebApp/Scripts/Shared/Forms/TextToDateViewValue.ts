import { FormattedDate } from "../FormattedDate";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToDateViewValue extends TypedFieldViewValue<string, Date> {
    protected _fromView(value: string) {
        return value ? new Date(value) : null;
    }

    protected _toView(value: Date) {
        return value ? new FormattedDate(value, 'yyyy-MM-dd') : '';
    }
}