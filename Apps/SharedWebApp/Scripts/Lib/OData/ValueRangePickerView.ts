import { CssLengthUnit } from "../CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BooleanInputView } from "../Views/BooleanInputView";
import { FormCheckView } from "../Views/FormCheckView";
import { FormGroupGridView, FormGroupInputView } from "../Views/FormGroup";
import { InputView } from "../Views/InputView";

export class ValueRangePickerView extends BasicComponentView {
    private readonly fromCheck: FormCheckView;
    readonly fromCheckInput: BooleanInputView;
    private readonly fromInputFormGroup: FormGroupInputView;
    readonly fromInput: InputView;
    private readonly fromIncludeCheck: FormCheckView;
    readonly fromIncludeInput: BooleanInputView;
    private readonly toCheck: FormCheckView;
    readonly toCheckInput: BooleanInputView;
    private readonly toInputFormGroup: FormGroupInputView;
    readonly toInput: InputView;
    private readonly toIncludeCheck: FormCheckView;
    readonly toIncludeInput: BooleanInputView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        const grid = this.addView(FormGroupGridView);
        grid.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        const fromCell = grid.addCell();
        fromCell.setGridColumn(1, -1);
        fromCell.setMargin(MarginCss.bottom(3));
        this.fromCheck = fromCell.addView(FormCheckView);
        this.fromCheck.styleAsSwitch();
        this.fromCheck.labelText.setText('From');
        this.fromCheckInput = this.fromCheck.input;
        this.fromInputFormGroup = grid.addFormGroup(FormGroupInputView);
        this.fromInputFormGroup.caption.setText('Start');
        this.fromInput = this.fromInputFormGroup.input;
        this.fromIncludeCheck = this.fromInputFormGroup.addCell()
            .addView(FormCheckView);
        this.fromIncludeCheck.styleAsSwitch();
        this.fromIncludeCheck.labelText.setText('Include');
        this.fromIncludeInput = this.fromIncludeCheck.input;
        const toCell = grid.addCell();
        toCell.setGridColumn(1, -1);
        toCell.setMargin(MarginCss.bottom(3));
        this.toCheck = toCell.addView(FormCheckView);
        this.toCheck.styleAsSwitch();
        this.toCheck.labelText.setText('To');
        this.toCheckInput = this.toCheck.input;
        this.toInputFormGroup = grid.addFormGroup(FormGroupInputView);
        this.toInputFormGroup.caption.setText('End');
        this.toInput = this.toInputFormGroup.input;
        this.toIncludeCheck = this.toInputFormGroup.addCell()
            .addView(FormCheckView);
        this.toIncludeCheck.styleAsSwitch();
        this.toIncludeCheck.labelText.setText('Include');
        this.toIncludeInput = this.toIncludeCheck.input;
    }

    setViewID(id: string) {
        this.fromCheck.setInputID(`${id}FromCheck`);
        this.fromIncludeCheck.setInputID(`${id}FromIncludeCheck`);
        this.toCheck.setInputID(`${id}ToCheck`);
        this.toIncludeCheck.setInputID(`${id}ToIncludeCheck`);
        super.setViewID(id);
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