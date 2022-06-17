import { NumericValue } from '../Lib/NumericValue';
import { NumericValues } from '../Lib/NumericValues';

export class EmployeeTypes extends NumericValues<EmployeeType> {
    constructor(
        public readonly none: EmployeeType,
        public readonly temp: EmployeeType,
        public readonly permanent: EmployeeType
    ) {
        super([none, temp, permanent]);
    }
}

export class EmployeeType extends NumericValue {
    public static readonly values = new EmployeeTypes(
        new EmployeeType(0, 'None'),
        new EmployeeType(1, 'Temp'),
        new EmployeeType(2, 'Permanent')
    );

    private constructor(Value: number, DisplayText: string) {
        super(Value, DisplayText);
    }
}