import { FileInputControl, FileType } from "../Components/FileInputControl";
import { EventBuilders } from "../Events";
import { FormGroupInputGroupView, FormGroupInputView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

type Events = { valueChanged: File[] };

export class FormGroupFileInput extends FormGroup {
    private readonly inputControl: FileInputControl;

    readonly when: EventBuilders<Events>;

    constructor(view: FormGroupInputView | FormGroupInputGroupView) {
        super(view);
        this.inputControl = this.addComponent(new FileInputControl(view.inputView));
        this.when = this.inputControl.when;
        this.setLabelFor(this.inputControl);
    }
    
    required() {
        this.inputControl.required();
    }

    notRequired() {
        this.inputControl.notRequired();
    }

    setCustomValidity(message: string) {
        this.inputControl.setCustomValidity(message);
    }

    getValue() { return this.inputControl.getFiles(); }

    allowMultiple() { this.inputControl.allowMultiple(); }

    preventMultiple() { this.inputControl.preventMultiple(); }

    acceptFileTypes(...fileTypes: (string | FileType)[]) {
        this.inputControl.acceptFileTypes(...fileTypes);
    }

    clear() {
        this.inputControl.clear();
    }
}