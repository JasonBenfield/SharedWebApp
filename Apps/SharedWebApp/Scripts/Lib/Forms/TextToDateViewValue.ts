import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToDateViewValue extends TypedFieldViewValue<string, Date> {
    protected _fromView(value: string) {
        if (value) {
            const match = /^(?<Year>\d{4})-(?<Month>\d{2})-(?<Day>\d{2})$/.exec(value);
            return new Date(
                Number(match.groups.Year),
                Number(match.groups.Month) - 1,
                Number(match.groups.Day)
            );
        }
        return value ? new Date(value) : null;
    }

    protected _toView(value: Date) {
        return value ? value.toISOString().substring(0, 10) : '';
    }
}