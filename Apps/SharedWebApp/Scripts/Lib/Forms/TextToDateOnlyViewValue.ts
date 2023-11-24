import { DateOnly } from "../DateOnly";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToDateOnlyViewValue extends TypedFieldViewValue<string, DateOnly> {
    protected _fromView(value: string) {
        if (value) {
            const match = /^(?<Year>\d{4})-(?<Month>\d{2})-(?<Day>\d{2})$/.exec(value);
            return new DateOnly(
                Number(match.groups.Year),
                Number(match.groups.Month) - 1,
                Number(match.groups.Day)
            );
        }
        return null;
    }

    protected _toView(value: Date) {
        return value ? value.toISOString() : '';
    }
}