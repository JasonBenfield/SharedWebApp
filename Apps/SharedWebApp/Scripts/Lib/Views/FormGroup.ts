﻿import { BorderCss } from "../BorderCss";
import { ContextualClass } from "../ContextualClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { PaddingCss } from "../PaddingCss";
import { TextCss } from "../TextCss";
import { AlertView } from "./AlertView";
import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { BlockView } from "./BlockView";
import { DropdownButtonView, DropdownMenuView } from "./Dropdown";
import { ErrorListItemView } from "./ErrorListItemView";
import { FaIconView } from "./FaIconView";
import { GridCellView, GridView } from "./Grid";
import { InputGroupView } from "./InputGroupView";
import { InputView } from "./InputView";
import { GridListGroupView } from "./ListGroup";
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
        this.textValue = this.valueCell.addView(TextBlockView);
        this.textValue.addCssName('form-control-plaintext');
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

export class FormGroupTextAreaView extends FormGroupView {
    readonly textArea: TextAreaView;

    constructor(container: BasicComponentView) {
        super(container);
        this.textArea = this.valueCell.addView(TextAreaView);
        this.textArea.styleAsFormControl();
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
    readonly alertList: GridListGroupView<ErrorListItemView>;
    private readonly dropdownButton: DropdownButtonView;
    readonly inputGroup: InputGroupView;

    constructor(container: BasicComponentView) {
        super(container);
        this.inputGroup = this.valueCell.addView(InputGroupView);
        this.dropdownButton = this.inputGroup.addButton(DropdownButtonView);
        const menuContainer = this.inputGroup.appendText(BlockView);
        menuContainer.addCssName('dropdown-menu');
        menuContainer.addCssName('dropdown-menu-right');
        menuContainer.setMargin(MarginCss.xs(0));
        menuContainer.setPadding(PaddingCss.xs(0));
        menuContainer.setBorderCss(new BorderCss().all(b => b.remove()));
        this.dropdownButton.initialize();
        this.dropdownButton.hide();
        this.dropdownButton.useOutlineStyle(ContextualClass.danger);
        this.dropdownButton.addView(FaIconView)
            .configure(i => i.solidStyle('exclamation'));
        const menu = menuContainer.addView(DropdownMenuView);
        menu.setPadding(PaddingCss.xs(0));
        const alertItem = menu.addListItem();
        alertItem.addCssName(ContextualClass.danger.append('border'));
        const alert = alertItem.addView(AlertView);
        alert.setMargin(MarginCss.xs(0));
        alert.setContext(ContextualClass.danger);
        this.alertList = alert.addGridListGroup(ErrorListItemView);
        this.alertList.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
    }

    showDropDown() { this.dropdownButton.show(); }

    hideDropDown() {
        this.dropdownButton.hide();
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