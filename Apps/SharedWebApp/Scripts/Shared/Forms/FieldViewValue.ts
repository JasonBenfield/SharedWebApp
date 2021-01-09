export class FieldViewValue {
    private value: any;

    getValue() {
        return this.value;
    }

    setValue(value: any) {
        this.value = value;
    }

    setValueFromView(value: any) {
        this.value = this._fromView(value);
    }

    protected _fromView(value: any) {
        return value;
    }

    toView() {
        return this._toView(this.value);
    }

    protected _toView(value: any) { return value; }
}
