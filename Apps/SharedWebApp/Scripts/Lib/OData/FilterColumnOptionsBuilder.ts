import { ODataColumn } from "./ODataColumn";
import { FilterConditions } from "./Types";

export class FilterColumnOptionsBuilder {
    private isAppending = false;
    private _ignoreCase = false;
    private condition: FilterConditions;
    private value: any;

    constructor(readonly column: ODataColumn) {
    }

    append() {
        this.isAppending = true;
    }

    replace() {
        this.isAppending = false;
    }

    setCondition(condition: FilterConditions) {
        this.condition = condition;
    }

    setValue(value: any) {
        this.value = value;
    }

    ignoreCase() {
        this._ignoreCase = true;
    }

    build() {
        return {
            isAppending: this.isAppending,
            condition: this.condition,
            ignoreCase: this._ignoreCase,
            value: this.value
        };
    }
}