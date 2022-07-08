import { MarginCss } from "../MarginCss";
import { PaddingCss } from "../PaddingCss";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { BlockView } from "../Views/BlockView";
import { FormCheckView } from "../Views/FormCheckView";
import { InputView } from "../Views/InputView";
import { SelectView } from "../Views/SelectView";
import { TextLabelView } from "../Views/TextLabelView";
import { TextSpanView } from "../Views/TextSpanView";

export class RelativeOffsetPickerView extends BasicComponentView {
    readonly offsetUnitSelect: SelectView;
    readonly noOffsetCheck: FormCheckView;
    readonly offsetInput: InputView;
    readonly offsetUnit: BasicTextComponentView;
    readonly offsetType: BasicTextComponentView;
    private readonly monthLabel: BasicTextComponentView;
    readonly monthSelect: SelectView;
    private readonly dayOfMonthLabel: BasicTextComponentView;
    readonly dayOfMonthSelect: SelectView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('d-contents');
        this.offsetUnitSelect = this.addView(BlockView)
            .configure(b => b.setPadding(PaddingCss.xs({ end: 3, bottom: 3 })))
            .addView(SelectView);
        this.offsetUnitSelect.styleAsFormControl();
        this.noOffsetCheck = this.addView(FormCheckView);
        this.noOffsetCheck.styleAsSwitch();
        this.noOffsetCheck.inline();
        this.offsetInput = this.addView(BlockView)
            .configure(b => b.setPadding(PaddingCss.end(3)))
            .addView(InputView);
        this.offsetInput.styleAsFormControl();
        const offsetBlock = this.addView(BlockView);
        this.offsetUnit = offsetBlock.addView(TextSpanView);
        this.offsetUnit.setMargin(MarginCss.end(1));
        this.offsetType = offsetBlock.addView(TextSpanView);
        this.addView(BlockView);
        this.monthLabel = this.addView(TextLabelView);
        this.monthLabel.setPadding(PaddingCss.end(3));
        this.monthLabel.setMargin(MarginCss.bottom(3));
        this.monthLabel.setText('Month');
        this.monthSelect = this.addView(BlockView)
            .configure(b => {
                b.setPadding(PaddingCss.end(3));
                b.setMargin(MarginCss.bottom(3));
            })
            .addView(SelectView);
        this.monthSelect.styleAsFormControl();
        this.addView(BlockView);
        this.addView(BlockView);
        this.dayOfMonthLabel = this.addView(TextLabelView);
        this.dayOfMonthLabel.setPadding(PaddingCss.end(3));
        this.dayOfMonthLabel.setMargin(MarginCss.bottom(3));
        this.dayOfMonthLabel.setText('Day of Month');
        this.dayOfMonthSelect = this.addView(BlockView)
            .configure(b => {
                b.setPadding(PaddingCss.end(3));
                b.setMargin(MarginCss.bottom(3));
            })
            .addView(SelectView);
        this.dayOfMonthSelect.styleAsFormControl();
        this.addView(BlockView);
    }

    showMonth() {
        this.monthLabel.show();
        this.monthSelect.show();
    }

    hideMonth() {
        this.monthLabel.hide();
        this.monthSelect.hide();
    }

    showDayOfMonth() {
        this.dayOfMonthLabel.show();
        this.dayOfMonthSelect.show();
    }

    hideDayOfMonth() {
        this.dayOfMonthLabel.hide();
        this.dayOfMonthSelect.hide();
    }
}