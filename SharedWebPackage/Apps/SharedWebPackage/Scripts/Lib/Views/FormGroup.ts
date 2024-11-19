import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { AlertView } from "./AlertView";
import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { BlockView } from "./BlockView";
import { BooleanInputView } from "./BooleanInputView";
import { DateTimeInputView } from "./DateTimeInputView";
import { FormCheckView } from "./FormCheckView";
import { GridCellView } from "./Grid";
import { InputGroupView } from "./InputGroupView";
import { InputView } from "./InputView";
import { LabelView } from "./LabelView";
import { LinkWithTextView } from "./LinkWithTextView";
import { SelectView } from "./SelectView";
import { TextAreaView } from "./TextAreaView";
import { TextBlockView } from "./TextBlockView";
import { TextPreView } from "./TextPreView";
import { TextStackView } from "./TextStackView";
import { TimeSpanInputView } from "./TimeSpanInputView";

export class FormGroupView extends BasicComponentView {
    readonly captionCell: GridCellView;
    readonly captionLabel: LabelView;
    readonly caption: BasicTextComponentView;
    readonly valueCell: GridCellView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('d-contents');
        this.addCssName('form-group');
        this.captionCell = this.addView(GridCellView);
        this.captionCell.addCssName('form-group-caption-cell');
        this.captionLabel = this.captionCell.addView(LabelView);
        this.captionLabel.addCssName('col-form-label');
        this.caption = this.captionLabel.addView(TextBlockView);
        this.valueCell = this.addView(GridCellView);
    }

    addCell() {
        return this.addView(GridCellView);
    }

    scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
        this.elementView.scrollIntoView(arg);
    }
}

export class FormGroupTextView extends FormGroupView {
    readonly valueTextView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        const textValue = this.valueCell.addView(TextBlockView);
        textValue.styleAsFormControl();
        this.valueTextView = textValue;
    }
}

export class FormGroupTextStackView extends FormGroupView {
    readonly textStackView: TextStackView;

    constructor(container: BasicComponentView) {
        super(container);
        const block = this.valueCell.addView(BlockView);
        block.styleAsFormControl();
        this.textStackView = block.addView(TextStackView);
    }
}

export class FormGroupPreformattedView extends FormGroupView {
    readonly valueTextView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        const textValue = this.valueCell.addView(TextPreView);
        textValue.addCssName('form-control-text');
        this.valueTextView = textValue;
    }
}

export class FormGroupLinkView extends FormGroupView {
    readonly linkView: LinkWithTextView;

    constructor(container: BasicComponentView) {
        super(container);
        this.linkView = this.valueCell.addView(LinkWithTextView);
        this.linkView.addCssName('form-control-link');
    }
}

export class FormGroupInputView extends FormGroupView {
    readonly inputView: InputView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.inputView = this.valueCell.addView(InputView);
        this.inputView.styleAsFormControl();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupInputGroupView extends FormGroupView {
    readonly inputGroupView: InputGroupView;
    readonly inputView: InputView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.inputGroupView = this.valueCell.addView(InputGroupView);
        this.inputView = this.inputGroupView.prependFormControl(InputView);
        this.inputView.styleAsFormControl();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupSelectGroupView extends FormGroupView {
    readonly inputGroupView: InputGroupView;
    readonly selectView: SelectView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.inputGroupView = this.valueCell.addView(InputGroupView);
        this.selectView = this.inputGroupView.prependFormControl(SelectView);
        this.selectView.styleAsFormControl();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupTextAreaView extends FormGroupView {
    readonly textAreaView: TextAreaView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.textAreaView = this.valueCell.addView(TextAreaView);
        this.textAreaView.styleAsFormControl();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupBooleanInputView extends FormGroupView {
    readonly inputView: BooleanInputView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.captionLabel.addCssName('form-check-label');
        const formCheckView = this.valueCell.addView(BlockView);
        formCheckView.addCssName('form-check');
        formCheckView.addCssName('form-switch');
        formCheckView.setMargin(MarginCss.top(2));
        this.inputView = formCheckView.addView(BooleanInputView);
        this.inputView.addCssName('form-check-input');
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupFormCheckView extends FormGroupView {
    readonly formCheckView: FormCheckView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.captionLabel.addCssName('form-check-label');
        this.formCheckView = this.valueCell.addView(FormCheckView);
        this.formCheckView.setMargin(MarginCss.top(2));
        this.formCheckView.styleAsSwitch();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupSelectView extends FormGroupView {
    readonly selectView: SelectView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.selectView = this.valueCell.addView(SelectView);
        this.selectView.styleAsFormControl();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupDateTimeInputView extends FormGroupView {
    readonly dateTimeInputView: DateTimeInputView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.dateTimeInputView = this.valueCell.addView(DateTimeInputView);
        this.dateTimeInputView.styleAsFormControl();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupTimeSpanInputView extends FormGroupView {
    readonly timeSpanInputView: TimeSpanInputView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.timeSpanInputView = this.valueCell.addView(TimeSpanInputView);
        this.timeSpanInputView.styleAsFormControl();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupAlertView extends FormGroupView {
    readonly alertView: AlertView;
    readonly messageTextView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        const outer = this.valueCell.addView(BlockView);
        outer.styleAsFormControl();
        this.alertView = outer.addView(AlertView);
        this.alertView.setMargin(MarginCss.xs(0));
        this.messageTextView = this.alertView.addView(TextBlockView);
    }
}

export abstract class SimpleFieldFormGroupView extends FormGroupView {
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }

    abstract setCustomValidity(errorMessage: string);
}

export class SimpleFieldFormGroupInputView extends SimpleFieldFormGroupView {
    readonly inputView: InputView;

    constructor(container: BasicComponentView) {
        super(container);
        const inputGroup = this.valueCell.addView(InputGroupView);
        this.inputView = inputGroup.prependFormControl(InputView);
    }

    setCustomValidity(errorMessage: string) {
        this.inputView.setCustomValidity(errorMessage);
        this.inputView.setTitle(errorMessage);
    }
}

export class SimpleFieldFormGroupDateTimeInputView extends SimpleFieldFormGroupView {
    readonly dateTimeInputView: DateTimeInputView;

    constructor(container: BasicComponentView) {
        super(container);
        this.dateTimeInputView = this.valueCell.addView(DateTimeInputView);
    }

    setCustomValidity(errorMessage: string) {
        this.dateTimeInputView.dateInputView.setCustomValidity(errorMessage);
        this.dateTimeInputView.setTitle(errorMessage);
    }
}

export class SimpleFieldFormGroupSelectView extends SimpleFieldFormGroupView {
    readonly selectView: SelectView;

    constructor(container: BasicComponentView) {
        super(container);
        this.selectView = this.valueCell.addView(SelectView);
        this.selectView.styleAsFormControl();
    }

    setCustomValidity(errorMessage: string) {
        this.selectView.setCustomValidity(errorMessage);
        this.selectView.setTitle(errorMessage);
    }
}

export class SimpleFieldFormGroupTimeSpanInputView extends SimpleFieldFormGroupView {
    readonly timeSpanInputView: TimeSpanInputView;

    constructor(container: BasicComponentView) {
        super(container);
        this.timeSpanInputView = this.valueCell.addView(TimeSpanInputView);
    }

    setCustomValidity(errorMessage: string) {
        this.timeSpanInputView.dayInputView.setCustomValidity(errorMessage);
        this.timeSpanInputView.setTitle(errorMessage);
    }
}