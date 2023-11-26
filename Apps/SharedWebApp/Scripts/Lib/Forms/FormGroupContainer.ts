import { BasicComponent } from "../Components/BasicComponent";
import { FormGroupGridView, FormGroupView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";
import { FormGroupAlert } from "./FormGroupAlert";
import { FormGroupBooleanInput } from "./FormGroupBooleanInput";
import { FormGroupDateInput } from "./FormGroupDateInput";
import { FormGroupDateTimeInput } from "./FormGroupDateTimeInput";
import { FormGroupInput } from "./FormGroupInput";
import { FormGroupSelect } from "./FormGroupSelect";
import { FormGroupText } from "./FormGroupText";
import { FormGroupTextArea } from "./FormGroupTextArea";
import { FormGroupTimeInput } from "./FormGroupTimeInput";
import { FormGroupTimeSpanInput } from "./FormGroupTimeSpanInput";
import { TextToNumberViewValue } from "./TextToNumberViewValue";
import { TextToTextViewValue } from "./TextToTextViewValue";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class FormGroupContainer extends BasicComponent {
    constructor(protected readonly view: FormGroupGridView) {
        super(view);
    }

    getFormGroups() {
        return this.getComponents().filter(c => c instanceof FormGroup) as FormGroup[];
    }

    addFormGroupSelect<TValue>() {
        return this.addFormGroup(
            (container) => container.addFormGroupSelectView(),
            (fgView) => new FormGroupSelect<TValue>(fgView)
        );
    }

    addFormGroupTextInput(transform?: (v: string) => string) {
        return this.addFormGroup(
            (container) => container.addFormGroupInputView(),
            (fgView) => new FormGroupInput(fgView, new TextToTextViewValue(transform))
        );
    }

    addFormGroupNumberInput(format?: string) {
        return this.addFormGroup(
            (container) => container.addFormGroupInputView(),
            (fgView) => new FormGroupInput(fgView, new TextToNumberViewValue(format))
        );
    }

    addFormGroupBooleanInput() {
        return this.addFormGroup(
            (container) => container.addFormGroupBooleanInputView(),
            (fgView) => new FormGroupBooleanInput(fgView)
        );
    }

    addFormGroupInput<TValue>(viewValue: TypedFieldViewValue<string, TValue>) {
        return this.addFormGroup(
            (container) => container.addFormGroupInputView(),
            (fgView) => new FormGroupInput(fgView, viewValue)
        );
    }
    
    addFormGroupDateInput() {
        return this.addFormGroup(
            (container) => container.addFormGroupInputView(),
            (fgView) => new FormGroupDateInput(fgView)
        );
    }

    addFormGroupTimeInput() {
        return this.addFormGroup(
            (container) => container.addFormGroupInputView(),
            (fgView) => new FormGroupTimeInput(fgView)
        );
    }

    addFormGroupDateTimeInput() {
        return this.addFormGroup(
            (container) => container.addFormGroupDateTimeInputView(),
            (fgView) => new FormGroupDateTimeInput(fgView)
        );
    }

    addFormGroupTimeSpanInput() {
        return this.addFormGroup(
            (container) => container.addFormGroupTimeSpanInputView(),
            (fgView) => new FormGroupTimeSpanInput(fgView)
        );
    }

    addFormGroupText() {
        return this.addFormGroup(
            (container) => container.addFormGroupTextView(),
            (fgView) => new FormGroupText(fgView)
        );
    }

    addFormGroupTextArea() {
        return this.addFormGroup(
            (container) => container.addFormGroupTextAreaView(),
            (fgView) => new FormGroupTextArea(fgView)
        );
    }

    addFormGroupAlert() {
        return this.addFormGroup(
            (container) => container.addFormGroupAlertView(),
            (fgView) => new FormGroupAlert(fgView)
        );
    }

    addFormGroup<TFormGroup extends FormGroup, TView extends FormGroupView>(
        createView: (containerView: FormGroupGridView) => TView,
        createFormGroup: (fgView: TView) => TFormGroup
    ) {
        const formGroupView = createView(this.view);
        return this.addComponent(createFormGroup(formGroupView));
    }
}