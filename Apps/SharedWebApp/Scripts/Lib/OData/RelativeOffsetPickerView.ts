import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { BlockView } from "../Views/BlockView";
import { BooleanInputView } from "../Views/BooleanInputView";
import { FormCheckView } from "../Views/FormCheckView";
import { InputView } from "../Views/InputView";
import { SelectView } from "../Views/SelectView";
import { TextBlockView } from "../Views/TextBlockView";

export class RelativeOffsetPickerView extends BasicComponentView {
    readonly offsetUnitSelect: SelectView;
    readonly noOffsetCheckInput: BooleanInputView;
    readonly noOffsetCheckLabel: BasicTextComponentView;
    readonly offsetInput: InputView;
    readonly offsetUnit: BasicTextComponentView;
    readonly offsetType: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('d-contents');
        this.offsetUnitSelect = this.addView(BlockView).addView(SelectView);
        const noOffsetCheck = this.addView(FormCheckView);
        noOffsetCheck.styleAsSwitch();
        noOffsetCheck.inline();
        this.noOffsetCheckInput = noOffsetCheck.input;
        this.noOffsetCheckLabel = noOffsetCheck.label.addView(TextBlockView);
        this.offsetInput = this.addView(BlockView).addView(InputView);
        this.offsetUnit = this.addView(TextBlockView);
        this.offsetType = this.addView(TextBlockView);
    }
}