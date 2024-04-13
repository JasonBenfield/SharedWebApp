import { CssLengthUnit } from "../CssLengthUnit";
import { FormGroup } from "../Forms/FormGroup";
import { FormGroupBooleanInput } from "../Forms/FormGroupBooleanInput";
import { MarginCss } from "../MarginCss";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BooleanInputView } from "../Views/BooleanInputView";
import { FormCheckView } from "../Views/FormCheckView";
import { FormGroupInputView } from "../Views/FormGroup";
import { FormGroupContainerView } from "../Views/FormGroupContainerView";
import { InputView } from "../Views/InputView";

export class ValueRangePickerView extends BasicComponentView {
    readonly fromCheckInput: BooleanInputView;
    private readonly fromInputFormGroup: FormGroupInputView;
    readonly fromInput: InputView;
    private readonly fromIncludeCheck: FormCheckView;
    readonly fromIncludeInput: BooleanInputView;
    readonly toCheckInput: BooleanInputView;
    private readonly toInputFormGroup: FormGroupInputView;
    readonly toInput: InputView;
    private readonly toIncludeCheck: FormCheckView;
    readonly toIncludeInput: BooleanInputView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        const formGroupContainer = this.addView(FormGroupContainerView);
        formGroupContainer.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        const fromBooleanInputView = formGroupContainer.addFormGroupBooleanInputView();
        fromBooleanInputView.caption.setText('From');
        this.fromCheckInput = fromBooleanInputView.inputView;
        fromBooleanInputView.addCell();
        this.fromInputFormGroup = formGroupContainer.addFormGroupInputView();
        this.fromInputFormGroup.caption.setText('Start');
        this.fromInput = this.fromInputFormGroup.inputView;
        this.fromIncludeCheck = this.fromInputFormGroup.addCell()
            .addView(FormCheckView);
        this.fromIncludeCheck.styleAsSwitch();
        this.fromIncludeCheck.labelText.setText('Include');
        this.fromIncludeInput = this.fromIncludeCheck.input;
        const toBooleanInputView = formGroupContainer.addFormGroupBooleanInputView();
        toBooleanInputView.caption.setText('To');
        toBooleanInputView.addCell();
        this.toCheckInput = toBooleanInputView.inputView;
        this.toInputFormGroup = formGroupContainer.addFormGroupInputView();
        this.toInputFormGroup.caption.setText('End');
        this.toInput = this.toInputFormGroup.inputView;
        this.toIncludeCheck = this.toInputFormGroup.addCell()
            .addView(FormCheckView);
        this.toIncludeCheck.styleAsSwitch();
        this.toIncludeCheck.labelText.setText('Include');
        this.toIncludeInput = this.toIncludeCheck.input;
    }
    
    showFromInput() {
        this.fromInputFormGroup.show();
    }

    hideFromInput() {
        this.fromInputFormGroup.hide();
    }

    showToInput() {
        this.toInputFormGroup.show();
    }

    hideToInput() {
        this.toInputFormGroup.hide();
    }
}