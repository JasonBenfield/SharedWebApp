import { BasicComponent } from "../Components/BasicComponent";
import { FormGroupAlertView, FormGroupBooleanInputView, FormGroupDateTimeInputView, FormGroupInputView, FormGroupLinkView, FormGroupPreformattedView, FormGroupSelectView, FormGroupTextAreaView, FormGroupTextView, FormGroupTimeSpanInputView } from "../Views/FormGroup";
import { FormGroupContainerView } from "../Views/FormGroupContainerView";
import { FormGroup } from "./FormGroup";
import { FormGroupAlert } from "./FormGroupAlert";
import { FormGroupBooleanInput } from "./FormGroupBooleanInput";
import { FormGroupDateInput } from "./FormGroupDateInput";
import { FormGroupDateTimeInput } from "./FormGroupDateTimeInput";
import { FormGroupFileInput } from "./FormGroupFileInput";
import { FormGroupInput } from "./FormGroupInput";
import { FormGroupLink } from "./FormGroupLink";
import { FormGroupSelect } from "./FormGroupSelect";
import { FormGroupText } from "./FormGroupText";
import { FormGroupTextArea } from "./FormGroupTextArea";
import { FormGroupTextInput } from "./FormGroupTextInput";
import { FormGroupTimeInput } from "./FormGroupTimeInput";
import { FormGroupTimeSpanInput } from "./FormGroupTimeSpanInput";
import { TextToNumberViewValue } from "./TextToNumberViewValue";
import { TextToTextViewValue } from "./TextToTextViewValue";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class FormGroupContainer extends BasicComponent {
    constructor(protected readonly view: FormGroupContainerView) {
        super(view);
    }

    getFormGroups() {
        return this.getComponents().filter(c => c instanceof FormGroup) as FormGroup[];
    }

    addFormGroupSelect<TValue>(view: FormGroupSelectView) {
        return this.addFormGroup(new FormGroupSelect<TValue>(view));
    }

    addFormGroupTextInput(view: FormGroupInputView, transform?: (v: string) => string) {
        return this.addFormGroup(new FormGroupTextInput(view, new TextToTextViewValue(transform)));
    }

    addFormGroupNumberInput(view: FormGroupInputView, format?: string) {
        return this.addFormGroup(new FormGroupInput(view, new TextToNumberViewValue(format)));
    }

    addFormGroupBooleanInput(view: FormGroupBooleanInputView) {
        return this.addFormGroup(new FormGroupBooleanInput(view));
    }

    addFormGroupInput<TValue>(view: FormGroupInputView, viewValue: TypedFieldViewValue<string, TValue>) {
        return this.addFormGroup(new FormGroupInput<TValue>(view, viewValue));
    }

    addFormGroupFileInput(view: FormGroupInputView) {
        return this.addFormGroup(new FormGroupFileInput(view));
    }

    addFormGroupDateInput(view: FormGroupInputView) {
        return this.addFormGroup(new FormGroupDateInput(view));
    }

    addFormGroupTimeInput(view: FormGroupInputView) {
        return this.addFormGroup(new FormGroupTimeInput(view));
    }

    addFormGroupDateTimeInput(view: FormGroupDateTimeInputView) {
        return this.addFormGroup(new FormGroupDateTimeInput(view));
    }

    addFormGroupTimeSpanInput(view: FormGroupTimeSpanInputView) {
        return this.addFormGroup(new FormGroupTimeSpanInput(view));
    }

    addFormGroupText(view: FormGroupTextView | FormGroupPreformattedView) {
        return this.addFormGroup(new FormGroupText(view));
    }

    addFormGroupTextArea(view: FormGroupTextAreaView) {
        return this.addFormGroup(new FormGroupTextArea(view));
    }

    addFormGroupAlert(view: FormGroupAlertView) {
        return this.addFormGroup(new FormGroupAlert(view));
    }

    addFormGroupLink(view: FormGroupLinkView) {
        return this.addFormGroup(new FormGroupLink(view));
    }

    addFormGroup<T extends FormGroup>(formGroup: T) {
        return this.addComponent(formGroup);
    }
}