import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { GridCellView, GridView } from "./Grid";
import { HtmlElementView } from "./HtmlElementView";
import { InputView } from "./InputView";
import { SelectView } from "./SelectView";
import { TextBlockView } from "./TextBlockView";
import { TextLabelView } from "./TextLabelView";
import { IContainerView, ViewConstructor } from "./Types";

export class FormGroupGridView extends GridView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'div'));
        this.borderless();
    }

    addFormGroup<T extends FormGroupView>(ctor?: ViewConstructor<T>) {
        return this.addView(ctor || FormGroupView);
    }
}

export class FormGroupView extends BasicComponentView {
    readonly captionCell: GridCellView;
    readonly caption: BasicTextComponentView;
    readonly valueCell: GridCellView;

    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'div'));
        this.addCssName('d-contents');
        this.addCssName('form-group');
        this.setMargin(MarginCss.bottom(3));
        this.captionCell = this.addView(GridCellView);
        this.captionCell.setTextCss(new TextCss().end().bold());
        this.caption = this.captionCell.addView(TextLabelView);
        this.valueCell = this.addView(GridCellView);
    }
}

export class FormGroupTextView extends FormGroupView {
    readonly textValue: BasicTextComponentView;

    constructor(container: IContainerView) {
        super(container);
        this.textValue = this.addView(TextBlockView);
        this.valueCell.addCssName('form-control-plaintext');
    }
}

export class FormGroupInputView extends FormGroupView {
    readonly input: InputView;

    constructor(container: IContainerView) {
        super(container);
        this.input = this.addView(InputView);
        this.input.addCssName('form-control');
    }
}

export class FormGroupSelectView extends FormGroupView {
    readonly select: SelectView;

    constructor(container: IContainerView) {
        super(container);
        this.select = this.addView(SelectView);
        this.select.addCssName('form-control');
    }
}