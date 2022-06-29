import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { BlockView } from "../Views/BlockView";
import { InputView } from "../Views/InputView";
import { SelectView } from "../Views/SelectView";
import { TextBlockView } from "../Views/TextBlockView";

export class RelativeDatePickerView extends BasicComponentView {
    readonly typeSelect: SelectView;
    readonly offsetInput: InputView;
    readonly offsetUnit: BasicTextComponentView;
    readonly offsetIndicator: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('d-contents');
        this.typeSelect = this.addView(BlockView).addView(SelectView);
        this.offsetInput = this.addView(BlockView).addView(InputView);
        this.offsetUnit = this.addView(TextBlockView);
        this.offsetIndicator = this.addView(TextBlockView);
    }
}