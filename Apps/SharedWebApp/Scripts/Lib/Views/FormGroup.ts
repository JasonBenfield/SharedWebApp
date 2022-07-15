import { ContextualClass } from "../ContextualClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { PaddingCss } from "../PaddingCss";
import { TextCss } from "../TextCss";
import { AlertView } from "./AlertView";
import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { DropdownComponentView } from "./Dropdown";
import { FaIconView } from "./FaIconView";
import { GridCellView, GridView } from "./Grid";
import { InputGroupView } from "./InputGroupView";
import { InputView } from "./InputView";
import { GridListGroupView } from "./ListGroup";
import { SelectView } from "./SelectView";
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
    readonly caption: BasicTextComponentView;
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
        this.textValue = this.valueCell.addView(TextBlockView);
        this.valueCell.addCssName('form-control-plaintext');
    }
}

export class FormGroupInputView extends FormGroupView {
    readonly input: InputView;

    constructor(container: BasicComponentView) {
        super(container);
        this.input = this.valueCell.addView(InputView);
        this.input.styleAsFormControl();
    }
}

export class FormGroupSelectView extends FormGroupView {
    readonly select: SelectView;

    constructor(container: BasicComponentView) {
        super(container);
        this.select = this.valueCell.addView(SelectView);
        this.select.styleAsFormControl();
    }
}

export class SimpleFieldFormGroupView extends FormGroupView {
    readonly alertList: GridListGroupView;
    private readonly dropdown: DropdownComponentView;
    readonly inputGroup: InputGroupView;

    constructor(container: BasicComponentView) {
        super(container);
        this.inputGroup = this.valueCell.addView(InputGroupView);
        this.dropdown = this.inputGroup.addDropdown();
        this.dropdown.hide();
        this.dropdown.button.useOutlineStyle(ContextualClass.danger);
        this.dropdown.button.addView(FaIconView)
            .configure(i => i.solidStyle('exclamation'));
        this.dropdown.menu.setPadding(PaddingCss.xs(0));
        const alertItem = this.dropdown.menu.addListItem();
        alertItem.addCssName(ContextualClass.danger.append('border'));
        const alert = alertItem.addView(AlertView);
        alert.setMargin(MarginCss.xs(0));
        alert.setContext(ContextualClass.danger);
        this.alertList = alert.addView(GridListGroupView);
        this.alertList.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
    }

    showDropDown() { this.dropdown.show(); }

    hideDropDown() {
        this.dropdown.hide();
    }
}

export class SimpleFieldFormGroupInputView extends SimpleFieldFormGroupView {
    readonly input: InputView;

    constructor(container: BasicComponentView) {
        super(container);
        this.input = this.inputGroup.prependFormControl(InputView);
    }
}

export class SimpleFieldFormGroupSelectView extends SimpleFieldFormGroupView {
    readonly select: SelectView;

    constructor(container: BasicComponentView) {
        super(container);
        this.select = this.inputGroup.prependFormControl(SelectView);
    }
}