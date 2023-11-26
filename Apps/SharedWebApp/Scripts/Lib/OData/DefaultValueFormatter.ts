import { DateOnly } from "../DateOnly";
import { DateTimeOffset } from "../DateTimeOffset";
import { TimeOnly } from "../TimeOnly";
import { TimeSpan } from "../TimeSpan";
import { ODataColumn } from "./ODataColumn";
import { IValueFormatter } from "./Types";

export class DefaultValueFormatter implements IValueFormatter {
    format(column: ODataColumn, record?: any) {
        let formatted: string;
        if (record) {
            const value = record[column.columnName];
            if (value instanceof Date) {
                if (value.getFullYear() === 9999 || value.getFullYear() === 1) {
                    formatted = '';
                }
                else {
                    if (value.getHours() || value.getMinutes() || value.getSeconds()) {
                        formatted = value.toLocaleString();
                    }
                    else {
                        formatted = value.toLocaleDateString();
                    }
                }
            }
            else if (value instanceof DateOnly || value instanceof DateTimeOffset) {
                if (value.isMaxYear) {
                    formatted = '';
                }
                else {
                    formatted = value.format();
                }
            }
            else if (typeof value === 'number') {
                formatted = value.toLocaleString();
            }
            else if (typeof value === 'string') {
                formatted = value;
            }
            else if (value instanceof TimeSpan) {
                formatted = value.format();
            }
            else if (value instanceof TimeOnly) {
                formatted = value.format();
            }
            else if (value) {
                if (value instanceof Object && 'displayText' in value) {
                    formatted = value.displayText;
                }
                else {
                    formatted = value.toString();
                }
            }
            else {
                formatted = '';
            }
        }
        else {
            formatted = column.displayText;
        }
        return formatted;
    }
}