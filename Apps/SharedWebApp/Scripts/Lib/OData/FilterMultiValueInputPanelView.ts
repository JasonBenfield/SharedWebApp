import { ContextualClass } from "../ContextualClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { Position, PositionUnit } from "../Position";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { BlockView } from "../Views/BlockView";
import { BooleanInputView } from "../Views/BooleanInputView";
import { ButtonCommandView } from "../Views/Command";
import { FormCheckView } from "../Views/FormCheckView";
import { FormView } from "../Views/FormView";
import { GridView } from "../Views/Grid";
import { InputGroupView } from "../Views/InputGroupView";
import { InputView } from "../Views/InputView";
import { GridListGroupView } from "../Views/ListGroup";
import { MessageAlertView } from "../Views/MessageAlertView";
import { ModalComponentView } from "../Views/Modal";
import { TextBlockView } from "../Views/TextBlockView";
import { TextHeading1View, TextHeading3View } from "../Views/TextHeadings";
import { ModalODataPanelView } from "./ModalODataPanelView";
import { SelectedValueListItemView } from "./SelectedValueListItemView";
import { SuggestedValueListItemView } from "./SuggestedValueListItemView";

export class FilterMultiValueInputPanelView extends ModalODataPanelView {
    readonly title: BasicTextComponentView;
    private readonly ignoreCaseFormCheck: FormCheckView;
    readonly ignoreCaseInput: BooleanInputView;
    readonly valueInput: InputView;
    readonly addButton: ButtonCommandView;
    readonly cancelButton: ButtonCommandView;
    readonly saveButton: ButtonCommandView;
    private readonly form: FormView;
    readonly alert: MessageAlertView;
    readonly suggestedValues: GridListGroupView<SuggestedValueListItemView>;
    private readonly selectedValuesHeader: BasicTextComponentView;
    readonly selectedValues: GridListGroupView<SelectedValueListItemView>;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.title = this.header.addView(TextHeading1View);
        this.body.height100();
        const layoutGrid = this.body.addView(GridView);
        layoutGrid.layout();
        layoutGrid.height100();
        layoutGrid.setTemplateRows(
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1),
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1)
        );
        this.form = layoutGrid.addCell().addView(FormView);
        this.form.addOffscreenSubmit();
        this.ignoreCaseFormCheck = this.form.addView(FormCheckView);
        this.ignoreCaseFormCheck.setMargin(MarginCss.bottom(3));
        this.ignoreCaseFormCheck.styleAsSwitch();
        this.ignoreCaseFormCheck.setInputID('filter-value-input-ignore-case');
        this.ignoreCaseInput = this.ignoreCaseFormCheck.input;
        this.ignoreCaseInput.setType('checkbox');
        this.ignoreCaseFormCheck.label.addView(TextBlockView).setText('Ignore Case?');
        const inputGroup = this.form.addView(InputGroupView);
        inputGroup.setMargin(MarginCss.bottom(3));
        this.valueInput = inputGroup.appendFormControl(InputView);
        this.valueInput.styleAsFormControl();
        this.addButton = inputGroup.addButton(ButtonCommandView);
        this.addButton.icon.solidStyle('plus');
        this.addButton.setText('');
        this.addButton.setTitle('Add Value');
        this.addButton.setContext(ContextualClass.secondary);

        const suggestedValuesCell = layoutGrid.addCell()
            .configure(c => c.positionRelative())
            .addView(BlockView)
            .configure(b => {
                b.positionAbsoluteFill();
                b.scrollable();
            });
        this.alert = suggestedValuesCell.addView(MessageAlertView);
        this.alert.positionSticky(Position.fillHorizontal());
        this.suggestedValues = suggestedValuesCell.addGridListGroup(SuggestedValueListItemView);
        this.suggestedValues.setTemplateColumns(CssLengthUnit.flex(1), CssLengthUnit.auto());

        this.selectedValuesHeader = layoutGrid.addCell()
            .addView(TextHeading3View);
        this.selectedValuesHeader.setText('Selected Values');

        this.selectedValues = layoutGrid.addCell()
            .configure(c => c.positionRelative())
            .addView(BlockView)
            .configure(b => {
                b.positionAbsoluteFill();
                b.scrollable();
            })
            .addGridListGroup(SelectedValueListItemView);
        this.selectedValues.setTemplateColumns(CssLengthUnit.flex(1), CssLengthUnit.auto());

        this.cancelButton = this.footer.addView(ButtonCommandView);
        this.cancelButton.icon.solidStyle('times');
        this.cancelButton.setText('Cancel');
        this.cancelButton.useOutlineStyle(ContextualClass.secondary);
        this.cancelButton.setMargin(MarginCss.end(3));
        this.saveButton = this.footer.addView(ButtonCommandView);
        this.saveButton.icon.solidStyle('check');
        this.saveButton.setText('Filter');
        this.saveButton.useOutlineStyle(ContextualClass.primary);
    }

    setViewID(id: string) {
        this.ignoreCaseFormCheck.setViewID(`${id}IgnoreCase`);
    }

    handleDeleteButton(action: (el: HTMLElement, evt: JQueryEventObject) => void) {
        this.selectedValues.on('click')
            .select('.deleteButton')
            .execute(action)
            .subscribe();
    }

    handleFormSubmit(action: (el: HTMLElement, evt: JQueryEventObject) => void) {
        this.form
            .onSubmit()
            .execute(action)
            .subscribe();
    }

    showIgnoreCase() { this.ignoreCaseFormCheck.show(); }

    hideIgnoreCase() { this.ignoreCaseFormCheck.hide(); }

    showSelectedValues() {
        this.selectedValuesHeader.show();
        this.selectedValues.show();
    }

    hideSelectedValues() {
        this.selectedValuesHeader.hide();
        this.selectedValues.hide();
    }
}