import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { InputGroupView } from "./InputGroupView";
import { InputView } from "./InputView";
import { TextSpanView } from "./TextSpanView";

export class TimeSpanInputView extends InputGroupView {
    readonly dayInputView: InputView;
    readonly dayCaptionTextView: BasicTextComponentView;
    readonly hourInputView: InputView;
    readonly hourCaptionTextView: BasicTextComponentView;
    readonly minuteInputView: InputView;
    readonly minuteCaptionTextView: BasicTextComponentView;
    readonly secondInputView: InputView;
    readonly secondCaptionTextView: BasicTextComponentView;
    readonly millisecondInputView: InputView;
    readonly millisecondCaptionTextView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.dayInputView = this.appendFormControl(InputView);
        this.dayCaptionTextView = this.appendText(TextSpanView);
        this.hourInputView = this.appendFormControl(InputView);
        this.hourCaptionTextView = this.appendText(TextSpanView);
        this.minuteInputView = this.appendFormControl(InputView);
        this.minuteCaptionTextView = this.appendText(TextSpanView);
        this.secondInputView = this.appendFormControl(InputView);
        this.secondCaptionTextView = this.appendText(TextSpanView);
        this.millisecondInputView = this.appendFormControl(InputView);
        this.millisecondCaptionTextView = this.appendText(TextSpanView);
    }

    styleAsFormControl() {
        this.dayInputView.styleAsFormControl();
        this.hourInputView.styleAsFormControl();
        this.minuteInputView.styleAsFormControl();
        this.secondInputView.styleAsFormControl();
        this.millisecondInputView.styleAsFormControl();
    }
}