import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { AlertView } from "./AlertView";
import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { BlockView } from "./BlockView";
import { BooleanInputView } from "./BooleanInputView";
import { DateTimeInputView } from "./DateTimeInputView";
import { GridCellView } from "./Grid";
import { InputGroupView } from "./InputGroupView";
import { InputView } from "./InputView";
import { LabelView } from "./LabelView";
import { LinkWithTextView } from "./LinkWithTextView";
import { SelectView } from "./SelectView";
import { TextAreaView } from "./TextAreaView";
import { TextBlockView } from "./TextBlockView";
import { TextPreView } from "./TextPreView";
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
        this.setMargin(MarginCss.bottom(3));
        this.captionCell = this.addView(GridCellView);
        this.captionCell.setTextCss(new TextCss().end().bold());
        this.captionLabel = this.captionCell.addView(LabelView);
        this.captionLabel.addCssName('col-form-label');
        this.caption = this.captionLabel.addView(TextBlockView);
        this.valueCell = this.addView(GridCellView);
    }

    addCell() {
        return this.addView(GridCellView);
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
    readonly inputGroup: InputGroupView;
    readonly select: SelectView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.inputGroup = this.valueCell.addView(InputGroupView);
        this.select = this.inputGroup.prependFormControl(SelectView);
        this.select.styleAsFormControl();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupTextAreaView extends FormGroupView {
    readonly textArea: TextAreaView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.textArea = this.valueCell.addView(TextAreaView);
        this.textArea.styleAsFormControl();
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

export class FormGroupSelectView extends FormGroupView {
    readonly select: SelectView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.select = this.valueCell.addView(SelectView);
        this.select.styleAsFormControl();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupDateTimeInputView extends FormGroupView {
    readonly dateTimeInput: DateTimeInputView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.dateTimeInput = this.valueCell.addView(DateTimeInputView);
        this.dateTimeInput.styleAsFormControl();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupTimeSpanInputView extends FormGroupView {
    readonly timeSpanInput: TimeSpanInputView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.timeSpanInput = this.valueCell.addView(TimeSpanInputView);
        this.timeSpanInput.styleAsFormControl();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupAlertView extends FormGroupView {
    readonly alert: AlertView;
    readonly messageTextView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        const outer = this.valueCell.addView(BlockView);
        outer.styleAsFormControl();
        this.alert = outer.addView(AlertView);
        this.alert.setMargin(MarginCss.xs(0));
        this.messageTextView = this.alert.addView(TextBlockView);
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
    readonly input: InputView;

    constructor(container: BasicComponentView) {
        super(container);
        const inputGroup = this.valueCell.addView(InputGroupView);
        this.input = inputGroup.prependFormControl(InputView);
    }

    setCustomValidity(errorMessage: string) {
        this.input.setCustomValidity(errorMessage);
        this.input.setTitle(errorMessage);
    }
}

export class SimpleFieldFormGroupDateTimeInputView extends SimpleFieldFormGroupView {
    readonly dateTimeInput: DateTimeInputView;

    constructor(container: BasicComponentView) {
        super(container);
        this.dateTimeInput = this.valueCell.addView(DateTimeInputView);
    }

    setCustomValidity(errorMessage: string) {
        this.dateTimeInput.dateInputView.setCustomValidity(errorMessage);
        this.dateTimeInput.setTitle(errorMessage);
    }
}

export class SimpleFieldFormGroupSelectView extends SimpleFieldFormGroupView {
    readonly select: SelectView;

    constructor(container: BasicComponentView) {
        super(container);
        this.select = this.valueCell.addView(SelectView);
    }

    setCustomValidity(errorMessage: string) {
        this.select.setCustomValidity(errorMessage);
        this.select.setTitle(errorMessage);
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