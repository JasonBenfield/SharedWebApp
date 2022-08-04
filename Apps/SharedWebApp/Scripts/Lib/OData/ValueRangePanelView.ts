import { ContextualClass } from "../ContextualClass";
import { MarginCss } from "../MarginCss";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { ButtonCommandView } from "../Views/Command";
import { ModalComponentView } from "../Views/Modal";
import { TextBlockView } from "../Views/TextBlockView";
import { TextHeading1View, TextHeading3View } from "../Views/TextHeadings";
import { ModalODataPanelView } from "./ModalODataPanelView";
import { ValueRangePickerView } from "./ValueRangePickerView";

export class ValueRangePanelView extends ModalODataPanelView {
    readonly columnName: BasicTextComponentView;
    readonly valueRangePicker: ValueRangePickerView;
    readonly preview: BasicTextComponentView;
    readonly cancelButton: ButtonCommandView;
    readonly saveButton: ButtonCommandView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.header.addView(TextHeading1View).setText('Filter');
        this.columnName = this.body.addView(TextHeading3View);
        this.columnName.setMargin(MarginCss.bottom(3));
        this.valueRangePicker = this.body.addView(ValueRangePickerView);
        this.valueRangePicker.setMargin(MarginCss.bottom(3));
        this.preview = this.body.addView(TextBlockView);
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
        this.valueRangePicker.setViewID(`${id}ValueRangePicker`);
    }
}