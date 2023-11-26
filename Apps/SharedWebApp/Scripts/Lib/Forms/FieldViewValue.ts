export class FieldViewValue {
    private value: any;

    getValue() {
        return this.value;
    }

    setValue(value: any) {
        this.value = value;
    }

    setValueFromView(viewValue: any) {
        const value = this._fromView(viewValue);
        this.value = value;
        return value;
    }

    protected _fromView(value: any) {
        return value;
    }

    toView(value?: any) {
        return this._toView(value === undefined ? this.value : value);
    }

    protected _toView(value: any) {
        return `${value}`;
    }
}
