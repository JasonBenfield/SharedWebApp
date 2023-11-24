import { CssLengthUnit } from "../CssLengthUnit";
import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { FaIconView } from "./FaIconView";
import { InputGroupView } from "./InputGroupView";
import { SelectView } from "./SelectView";
import { SpanView } from "./SpanView";
import { TextSpanView } from "./TextSpanView";

export class TimeInputView extends InputGroupView {
    readonly hourSelectView: SelectView;
    readonly hourSeparatorTextView: BasicTextComponentView;
    readonly minuteSelectView: SelectView;
    readonly minuteSeparatorTextView: BasicTextComponentView;
    readonly secondSelectView: SelectView;
    readonly amPmSelectView: SelectView;

    constructor(container: BasicComponentView) {
        super(container);
        this.hourSelectView = this.appendFormControl(SelectView);
        this.hourSelectView.addCssName('time-input-select');
        this.hourSeparatorTextView = this.appendText(TextSpanView);
        this.hourSeparatorTextView.addCssName('time-input-separator');
        this.minuteSelectView = this.appendFormControl(SelectView);
        this.minuteSelectView.addCssName('time-input-select');
        this.minuteSeparatorTextView = this.appendText(TextSpanView);
        this.minuteSeparatorTextView.addCssName('time-input-separator');
        this.secondSelectView = this.appendFormControl(SelectView);
        this.secondSelectView.addCssName('time-input-select');
        this.appendText(TextSpanView).setText(' ');
        this.amPmSelectView = this.appendFormControl(SelectView);
        this.amPmSelectView.addCssName('time-input-select');
        const iconSpanView = this.appendText(SpanView);
        iconSpanView.addCssName('time-input-icon');
        const iconView = iconSpanView.addView(FaIconView);
        iconView.regularStyle('clock');
    }

    styleAsFormControl() {
        this.hourSelectView.styleAsFormControl();
        this.minuteSelectView.styleAsFormControl();
        this.secondSelectView.styleAsFormControl();
        this.amPmSelectView.styleAsFormControl();
    }

    includeSeconds() {
        this.setMaxWidth(CssLengthUnit.em(50));
    }

    excludeSeconds() {
        this.setMaxWidth(CssLengthUnit.em(30));
    }

}