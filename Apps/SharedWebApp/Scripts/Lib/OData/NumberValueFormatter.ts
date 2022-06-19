import { FormattedNumber } from "../FormattedNumber";
import { ODataColumn } from "./ODataColumn";
import { IValueFormatter } from "./Types";

export class NumberValueFormatter implements IValueFormatter {
    constructor(private readonly formatString: string) {
    }

    format(column: ODataColumn, record?: any): string {
        return record && record[column.columnName]
            ? new FormattedNumber(record[column.columnName], this.formatString).toString()
            : '';
    }
}