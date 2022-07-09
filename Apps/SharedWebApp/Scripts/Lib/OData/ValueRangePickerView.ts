import { CssLengthUnit } from "../CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BooleanInputView } from "../Views/BooleanInputView";
import { FormCheckView } from "../Views/FormCheckView";
import { FormGroupGridView, FormGroupInputView } from "../Views/FormGroup";
import { InputView } from "../Views/InputView";

export class ValueRangePickerView extends BasicComponentView {
    readonly fromCheckInput: BooleanInputView;
    private readonly fromInputFormGroup: FormGroupInputView;
    readonly fromInput: InputView;
    readonly fromIncludeInput: BooleanInputView;
    readonly toCheckInput: BooleanInputView;
    private readonly toInputFormGroup: FormGroupInputView;
    readonly toInput: InputView;
    readonly toIncludeInput: BooleanInputView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        const grid = this.addView(FormGroupGridView);
        grid.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        const fromCell = grid.addCell();
        fromCell.setGridColumn(1, -1);
        fromCell.setMargin(MarginCss.bottom(3));
        const fromCheck = fromCell.addView(FormCheckView);
        fromCheck.styleAsSwitch();
        fromCheck.labelText.setText('From');
        this.fromCheckInput = fromCheck.input;
        this.fromInputFormGroup = grid.addFormGroup(FormGroupInputView);
        this.fromInputFormGroup.caption.setText('Start');
        this.fromInput = this.fromInputFormGroup.input;
        const fromIncludeCheck = this.fromInputFormGroup.addCell()
            .addView(FormCheckView);
        fromIncludeCheck.styleAsSwitch();
        fromIncludeCheck.labelText.setText('Include');
        this.fromIncludeInput = fromIncludeCheck.input;
        const toCell = grid.addCell();
        toCell.setGridColumn(1, -1);
        toCell.setMargin(MarginCss.bottom(3));
        const toCheck = toCell.addView(FormCheckView);
        toCheck.styleAsSwitch();
        toCheck.labelText.setText('To');
        this.toCheckInput = toCheck.input;
        this.toInputFormGroup = grid.addFormGroup(FormGroupInputView);
        this.toInputFormGroup.caption.setText('End');
        this.toInput = this.toInputFormGroup.input;
        const toIncludeCheck = this.toInputFormGroup.addCell()
            .addView(FormCheckView);
        toIncludeCheck.styleAsSwitch();
        toIncludeCheck.labelText.setText('Include');
        this.toIncludeInput = toIncludeCheck.input;
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