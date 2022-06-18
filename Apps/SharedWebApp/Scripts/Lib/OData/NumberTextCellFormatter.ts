import { FormattedNumber } from "../FormattedNumber";
import { ODataColumn } from "./ODataColumn";
import { ITextCellFormatter } from "./Types";

export class NumberTextCellFormatter implements ITextCellFormatter {
    constructor(private readonly formatString: string) {
    }

    format(column: ODataColumn, record?: any): string {
        return record && record[column.columnName]
            ? new FormattedNumber(record[column.columnName], this.formatString).toString()
            : '';
    }
}