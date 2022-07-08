import { ContextualClass } from "../ContextualClass";
import { MarginCss } from "../MarginCss";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { BooleanInputView } from "../Views/BooleanInputView";
import { ButtonCommandView } from "../Views/Commands";
import { FormCheckView } from "../Views/FormCheckView";
import { FormView } from "../Views/FormView";
import { InputView } from "../Views/InputView";
import { ModalComponentView } from "../Views/Modal";
import { TextBlockView } from "../Views/TextBlockView";
import { TextHeading1View, TextHeading3View } from "../Views/TextHeadings";
import { ModalODataPanelView } from "./ModalODataPanelView";

export class FilterValueInputPanelView extends ModalODataPanelView {
    readonly title: BasicTextComponentView;
    readonly operation: BasicTextComponentView;
    private readonly ignoreCaseFormCheck: FormCheckView;
    readonly ignoreCaseInput: BooleanInputView;
    readonly valueInput: InputView;
    readonly cancelButton: ButtonCommandView;
    readonly saveButton: ButtonCommandView;
    readonly form: FormView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.title = this.header.addView(TextHeading1View);
        this.form = this.body.addView(FormView);
        this.form.addOffscreenSubmit();
        this.operation = this.form.addView(TextHeading3View);
        this.operation.setMargin(MarginCss.bottom(3));
        this.ignoreCaseFormCheck = this.form.addView(FormCheckView);
        this.ignoreCaseFormCheck.setMargin(MarginCss.bottom(3));
        this.ignoreCaseFormCheck.styleAsSwitch();
        this.ignoreCaseFormCheck.setInputID('filter-value-input-ignore-case');
        this.ignoreCaseInput = this.ignoreCaseFormCheck.input;
        this.ignoreCaseInput.setType('checkbox');
        this.ignoreCaseFormCheck.label.addView(TextBlockView).setText('Ignore Case?');
        this.valueInput = this.form.addView(InputView);
        this.valueInput.styleAsFormControl();
        this.valueInput.setMargin(MarginCss.bottom(3));
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

    showIgnoreCase() { this.ignoreCaseFormCheck.show(); }

    hideIgnoreCase() { this.ignoreCaseFormCheck.hide(); }
}