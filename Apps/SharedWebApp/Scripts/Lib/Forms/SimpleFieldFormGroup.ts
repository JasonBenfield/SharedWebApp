import { BasicComponent } from "../Components/BasicComponent";
import { TextComponent } from "../Components/TextComponent";
import { ErrorModel } from "../ErrorModel";
import { JoinedStrings } from "../JoinedStrings";
import { SimpleFieldFormGroupView } from "../Views/FormGroup";
import { ErrorList } from "./ErrorList";

export abstract class SimpleFieldFormGroup<TValue> extends BasicComponent implements IField {
    private readonly name: string;
    private caption: string;
    private readonly captionBlock: TextComponent;
    protected readonly valueTextComponent: TextComponent;
    protected hasValidated = false;

    constructor(prefix: string, name: string, protected readonly view: SimpleFieldFormGroupView) {
        super(view);
        this.name = prefix ? `${prefix}_${name}` : name;
        this.captionBlock = this.addComponent(new TextComponent(view.caption));
        this.valueTextComponent = this.addComponent(new TextComponent(view.valueTextView));
    }

    getName() {
        return this.name;
    }

    abstract getValue(): TValue;

    abstract setValue(value: TValue);

    getCaption() {
        return this.caption;
    }

    setCaption(caption: string) {
        this.caption = caption;
        this.captionBlock.setText(caption);
    }

    getField(name: string) { return this.getName() === name ? this : null; }

    setErrors(errors: ErrorModel[]) {
        const message = new JoinedStrings('\n', errors.map(e => e.Message)).value();
        this.setCustomValidity(message);
    }

    protected abstract setCustomValidity(errorMessage: string);

    clearErrors() {
        this.view.setCustomValidity('');
        this.hasValidated = false;
    }

    validate(errors: IErrorList) {
        const fieldErrors = new ErrorList();
        this.validateConstraints(fieldErrors);
        this.setErrors(fieldErrors.values());
        errors.merge(fieldErrors);
        this.hasValidated = true;
    }

    protected abstract validateConstraints(fieldErrors: ErrorList);

    import(values: Record<string, any>) {
        if (values) {
            const value = values[this.getName()];
            if (value !== undefined) {
                this.setValue(value);
            }
        }
    }

    export(values: Record<string, any>) {
        values[this.getName()] = this.getValue();
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}