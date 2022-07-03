import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class MultiViewValue<TView, TActual> extends TypedFieldViewValue<TView, TActual>{
    private viewValue: TypedFieldViewValue<TView, TActual>;

    constructor(viewValue: TypedFieldViewValue<TView, TActual>) {
        super();
        this.viewValue = viewValue;
    }

    setViewValue(viewValue: TypedFieldViewValue<TView, TActual>) {
        this.viewValue = viewValue;
    }

    getValue = () => {
        return this.viewValue.getValue();
    }

    setValue = (value: any) => {
        this.viewValue.setValue(value);
    }

    setValueFromView = (viewValue: TView) => {
        return this.viewValue.setValueFromView(viewValue);
    }

    toView() {
        return this.viewValue.toView();
    }
}