﻿import { ODataColumn } from "./ODataColumn";
import { ITextCellFormatter } from "./Types";

export class DefaultTextCellFormatter implements ITextCellFormatter {
    format(column: ODataColumn, record?: any) {
        let formatted: string;
        if (record) {
            const value = record[column.columnName];
            if (value instanceof Date) {
                formatted = value.toLocaleDateString();
            }
            else if (typeof value === 'number') {
                formatted = value.toLocaleString();
            }
            else if (typeof value === 'string') {
                formatted = value;
            }
            else if (value) {
                formatted = value.toString();
            }
            else {
                formatted = '';
            }
        }
        else {
            formatted = column.columnName;
        }
        return formatted;
    }
}