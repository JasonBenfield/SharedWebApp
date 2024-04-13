
export class SourceType {
    static readonly none= new SourceType('none'); 

    constructor(readonly value: string) {
    }

    isNone() { return this.value === SourceType.none.value; }

    isString() { return this.value === 'String'; }

    isNumber() {
        return this.isInt16() || this.isInt32() || this.isInt64() ||
            this.isDecimal() || this.isDouble() || this.isFloat();
    }

    isInt16() { return this.value === 'Int16'; }

    isInt32() { return this.value === 'Int32'; }

    isInt64() { return this.value === 'Int64'; }

    isDecimal() { return this.value === 'Decimal'; }

    isDouble() { return this.value === 'Double'; }

    isFloat() { return this.value === 'Float'; }

    isBoolean() { return this.value === 'Bool'; }

    isDate() { return this.isDateTimeOffset() || this.isDateTime(); }

    isDateTimeOffset() { return this.value === 'DateTimeOffset'; }

    isDateTime() { return this.value === 'DateTime'; }

    isTimeSpan() { return this.value === 'TimeSpan'; }
}