import { CssLengthUnit } from "../CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { AlertView } from "./AlertView";
import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { BlockView } from "./BlockView";
import { DateTimeInputView } from "./DateTimeInputView";
import { GridCellView, GridView } from "./Grid";
import { InputGroupView } from "./InputGroupView";
import { InputView } from "./InputView";
import { SelectView } from "./SelectView";
import { TextAreaView } from "./TextAreaView";
import { TextBlockView } from "./TextBlockView";
import { TextLabelView } from "./TextLabelView";
import { ViewConstructor } from "./Types";

export class FormGroupGridView extends GridView {
    constructor(container: BasicComponentView) {
        super(container);
        this.layout();
        this.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
    }

    addFormGroup<T extends FormGroupView>(ctor?: ViewConstructor<T>) {
        return this.addView(ctor || FormGroupView) as T;
    }
}

export class FormGroupView extends BasicComponentView {
    readonly captionCell: GridCellView;
    readonly caption: TextLabelView;
    readonly valueCell: GridCellView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('d-contents');
        this.addCssName('form-group');
        this.setMargin(MarginCss.bottom(3));
        this.captionCell = this.addView(GridCellView);
        this.captionCell.setTextCss(new TextCss().end().bold());
        this.caption = this.captionCell.addView(TextLabelView);
        this.caption.addCssName('col-form-label');
        this.valueCell = this.addView(GridCellView);
    }

    addCell() {
        return this.addView(GridCellView);
    }
}

export class FormGroupTextView extends FormGroupView {
    readonly textValue: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        const textValue = this.valueCell.addView(TextBlockView);
        textValue.styleAsFormControl();
        this.textValue = textValue;
    }
}

export class FormGroupInputView extends FormGroupView {
    readonly input: InputView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.input = this.valueCell.addView(InputView);
        this.input.styleAsFormControl();
        this.valueTextView = this.valueCell.addView(TextBlockView);
        this.valueTextView.styleAsFormControl();
        this.valueTextView.hide();
    }
}

export class FormGroupInputGroupView extends FormGroupView {
    readonly inputGroup: InputGroupView;
    readonly input: InputView;
    readonly valueTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.inputGroup = this.valueCell.addView(InputGroupView);
        this.input = this.inputGroup.prependFormControl(InputView);
        this.input.styleAsFormControl();
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
        const inputGroup = this.addView(InputGroupView);
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
        this.dateTimeInput = this.addView(DateTimeInputView);
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
        const inputGroup = this.addView(InputGroupView);
        this.select = inputGroup.prependFormControl(SelectView);
    }

    setCustomValidity(errorMessage: string) {
        this.select.setCustomValidity(errorMessage);
        this.select.setTitle(errorMessage);
    }
}