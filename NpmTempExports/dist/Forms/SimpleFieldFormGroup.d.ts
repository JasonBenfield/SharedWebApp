import { ErrorModel } from "../ErrorModel";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroupView } from "./SimpleFieldFormGroupView";
export declare abstract class SimpleFieldFormGroup<TValue> implements IField {
    protected readonly view: SimpleFieldFormGroupView;
    private readonly name;
    private caption;
    private readonly captionBlock;
    private readonly alertList;
    constructor(prefix: string, name: string, view: SimpleFieldFormGroupView);
    getName(): string;
    abstract getValue(): TValue;
    abstract setValue(value: TValue): any;
    getCaption(): string;
    setCaption(caption: string): void;
    getField(name: string): this;
    setErrors(errors: ErrorModel[]): void;
    clearErrors(): void;
    validate(errors: IErrorList): void;
    protected abstract validateConstraints(fieldErrors: ErrorList): any;
    import(values: Record<string, any>): void;
    export(values: Record<string, any>): void;
}
